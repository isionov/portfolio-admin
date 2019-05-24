import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  worksPostNewWorkAction,
  worksGetAllWorkAction,
  worksGetAllWorkSuccessAction,
  worksCloseRedactionCardAction,
  worksChangeWorkAction,
  worksDeleteWorkAction
} from "./actions";
import axios from "axios";
import { getToken, getUserId } from "../Auth/selectors";
import instanceAxios from "../initApi.js";

export function* workWatcher() {
  yield takeEvery(worksPostNewWorkAction, postNewWorkWorker);
  yield takeEvery(worksGetAllWorkAction, getAllWorkskWorker);
  yield takeEvery(worksChangeWorkAction, postChangeWorkWorker);
  yield takeEvery(worksDeleteWorkAction, postDeleteWorkWorker);
}

const postNewWork = async formData => {
  const rawData = await instanceAxios.post(`/works`, formData);

  return rawData.data;
};

export function* postNewWorkWorker(action) {
  const { formData } = action.payload;

  try {
    const res = yield call(postNewWork, formData);
    yield put(worksCloseRedactionCardAction());
    yield put(worksGetAllWorkAction());
  } catch (error) {
    console.log(error);
  }
}

const getAllWork = async id => {
  const rawData = await instanceAxios.get(`/works`);

  return rawData.data;
};

export function* getAllWorkskWorker() {
  try {
    const res = yield call(getAllWork);
    yield put(worksGetAllWorkSuccessAction(res));
  } catch (error) {
    console.log(error);
  }
}

const postChangeWork = async (formData, currentId) => {
  const rawData = await instanceAxios.post(`/works/${currentId}`, formData);

  return rawData.data;
};

export function* postChangeWorkWorker(action) {
  const { formData, currentId } = action.payload;
  const token = yield select(getToken);
  try {
    const res = yield call(postChangeWork, formData, currentId);
    yield put(worksCloseRedactionCardAction());
    yield put(worksGetAllWorkAction());
  } catch (error) {
    console.log(error);
  }
}

const postDeleteWork = async (token, currentId) => {
  const rawData = await instanceAxios.delete(`/works/${currentId}`);

  return rawData.data;
};

export function* postDeleteWorkWorker(action) {
  const { currentId } = action.payload;
  const token = yield select(getToken);
  try {
    const res = yield call(postDeleteWork, token, currentId);
    yield put(worksGetAllWorkAction());
  } catch (error) {
    console.log(error);
  }
}
