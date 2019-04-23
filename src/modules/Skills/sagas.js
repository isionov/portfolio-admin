import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  skillFetchNewCardAction,
  skillFetchNewCardSuccessAction,
  skillFetchNewCardFailureAction,
  skillGetAllCardsAction,
  skillGetAllCardsActionSuccess,
  skillGetAllCardsActionFailure,
  skillFetchNewSkill,
  skillGetCurrentSkillsAction,
  skillGetCurrentSkillsSuccessAction,
  skillFetchChangeTitleAction,
  skillFetchChangeSkillAction,
  skillRemoveCardAction,
  skillRemoveSkillAction
} from "./actions";
import { getToken, getUserId } from "../Auth/selectors";
import axios from "axios";
import instanceAxios from "../initApi.js";

const postNewCard = async (token, payload) => {
  const rawData = await instanceAxios.post("/categories", {
    title: payload
  });

  return rawData.data;
};

const getAllCards = async token => {
  const rawData = await instanceAxios.get("/categories");

  return rawData.data;
};

const postNewSkill = async (token, payload) => {
  const rawData = await instanceAxios.post("/skills", payload);

  return rawData.data;
};

const getCurrentSkills = async (token, payload) => {
  const rawData = await instanceAxios.get(`/skills/${payload}`);

  return rawData.data;
};

const postNewTitle = async (token, title, cardId) => {
  const rawData = await instanceAxios.post(`/categories/${cardId}`, {
    title: title
  });

  return rawData.data;
};

const postChangingSkill = async (token, title, percent, cardId, rowId) => {
  const rawData = await instanceAxios.post(`/skills/${rowId}`, {
    title: title,
    percent: percent,
    category: cardId
  });

  return rawData.data;
};

const deleteCard = async (token, cardId) => {
  const rawData = await instanceAxios.delete(`/categories/${cardId}`);

  return rawData.data;
};

const deleteSkill = async (token, cardId) => {
  const rawData = await instanceAxios.delete(`/skills/${cardId}`);

  return rawData.data;
};

export function* skillWatcher() {
  yield takeEvery(skillFetchNewCardAction, skillWorker);
  yield takeEvery(skillGetAllCardsAction, skillWorkerGettingAllCards);
  yield takeEvery(skillFetchNewSkill, skillWorkerAddSkill);
  yield takeEvery(skillGetCurrentSkillsAction, skillWorkerGetCurrenSkills);
  yield takeEvery(skillFetchChangeTitleAction, skillWorkerChangeTitle);
  yield takeEvery(skillFetchChangeSkillAction, skillWorkerChangeSkill);
  yield takeEvery(skillRemoveCardAction, skillWorkerRemoveCard);
  yield takeEvery(skillRemoveSkillAction, skillWorkerRemoveSkill);
}

export function* skillWorker(action) {
  const { title } = action.payload;
  const token = yield select(getToken);
  try {
    const res = yield call(postNewCard, token, title);
    yield put(skillFetchNewCardSuccessAction(res));
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    yield put(skillFetchNewCardFailureAction(error));
  }
}

export function* skillWorkerGettingAllCards(action) {
  const token = yield select(getToken);
  try {
    yield call(skillWorkerGetCurrenSkills);
    const res = yield call(getAllCards, token);
    yield put(skillGetAllCardsActionSuccess(res));
  } catch (error) {
    yield put(skillGetAllCardsActionFailure(error));
  }
}

export function* skillWorkerAddSkill(action) {
  const { category } = action.payload;
  const token = yield select(getToken);
  try {
    const res = yield call(postNewSkill, token, action.payload);
    yield put(skillGetCurrentSkillsAction(category));
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerGetCurrenSkills(action) {
  const token = yield select(getToken);
  const id = yield select(getUserId);
  try {
    const res = yield call(getCurrentSkills, token, id);
    yield put(skillGetCurrentSkillsSuccessAction(res));
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerChangeTitle(action) {
  const { title, cardId } = action.payload;
  const token = yield select(getToken);
  try {
    yield call(postNewTitle, token, title, cardId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerChangeSkill(action) {
  const { title, percent, cardId, rowId } = action.payload;
  const token = yield select(getToken);
  try {
    yield call(postChangingSkill, token, title, percent, cardId, rowId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerRemoveCard(action) {
  const { cardId } = action.payload;
  const token = yield select(getToken);

  try {
    yield call(deleteCard, token, cardId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerRemoveSkill(action) {
  const { rowId } = action.payload;
  const token = yield select(getToken);

  try {
    yield call(deleteSkill, token, rowId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}
