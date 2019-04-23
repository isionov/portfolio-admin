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

const postNewWork = async (token, formData) => {
  const rawData = await instanceAxios.post(`/works`, formData);

  return rawData.data;
};

export function* postNewWorkWorker(action) {
  const { formData } = action.payload;
  const token = yield select(getToken);

  try {
    const res = yield call(postNewWork, token, formData);
    yield put(worksCloseRedactionCardAction());
    yield put(worksGetAllWorkAction());
  } catch (error) {
    console.log(error);
  }
}

const getAllWork = async (token, id) => {
  const rawData = await instanceAxios.get(`/works/${id}`);

  return rawData.data;
};

export function* getAllWorkskWorker() {
  const token = yield select(getToken);
  const id = yield select(getUserId);

  try {
    const res = yield call(getAllWork, token, id);
    yield put(worksGetAllWorkSuccessAction(res));
  } catch (error) {
    console.log(error);
  }
}

const postChangeWork = async (token, formData, currentId) => {
  const rawData = await instanceAxios.post(`/works/${currentId}`, formData);

  return rawData.data;
};

export function* postChangeWorkWorker(action) {
  const { formData, currentId } = action.payload;
  const token = yield select(getToken);
  try {
    const res = yield call(postChangeWork, token, formData, currentId);
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
