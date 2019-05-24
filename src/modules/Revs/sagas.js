import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  revsPostNewRevAction,
  revsGetAllRevAction,
  revsGetAllRevSuccessAction,
  revsCloseRedactionCardAction,
  revsChangeRevAction,
  revsDeleteRevAction
} from "./actions";
import axios from "axios";
import { getToken, getUserId } from "../Auth/selectors";
import instanceAxios from "../initApi.js";

export function* revWatcher() {
  yield takeEvery(revsPostNewRevAction, postNewRevWorker);
  yield takeEvery(revsGetAllRevAction, getAllRevWorker);
  yield takeEvery(revsChangeRevAction, postChangeRevWorker);
  yield takeEvery(revsDeleteRevAction, postDeleteRevWorker);
}

const postNewRev = async formData => {
  const rawData = await instanceAxios.post(`/reviews`, formData);

  return rawData.data;
};

export function* postNewRevWorker(action) {
  const { formData } = action.payload;

  try {
    const res = yield call(postNewRev, formData);
    yield put(revsCloseRedactionCardAction());
    yield put(revsGetAllRevAction());
  } catch (error) {
    console.log(error);
  }
}

const getAllRev = async () => {
  const rawData = await instanceAxios.get(`/reviews`);

  return rawData.data;
};

export function* getAllRevWorker() {
  try {
    const res = yield call(getAllRev);
    yield put(revsGetAllRevSuccessAction(res));
  } catch (error) {
    console.log(error);
  }
}

const postChangeRev = async (formData, currentId) => {
  const rawData = await instanceAxios.post(`/reviews/${currentId}`, formData);

  return rawData.data;
};

export function* postChangeRevWorker(action) {
  const { formData, currentId } = action.payload;
  try {
    const res = yield call(postChangeRev, formData, currentId);
    yield put(revsCloseRedactionCardAction());
    yield put(revsGetAllRevAction());
  } catch (error) {
    console.log(error);
  }
}

const postDeleteRev = async currentId => {
  const rawData = await instanceAxios.delete(`/reviews/${currentId}`);

  return rawData.data;
};

export function* postDeleteRevWorker(action) {
  const { currentId } = action.payload;
  try {
    const res = yield call(postDeleteRev, currentId);
    yield put(revsGetAllRevAction());
  } catch (error) {
    console.log(error);
  }
}
