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
import instanceAxios from "../initApi.js";

const postNewCard = async payload => {
  const rawData = await instanceAxios.post("/categories", {
    title: payload
  });

  return rawData.data;
};

const getAllCards = async () => {
  const rawData = await instanceAxios.get("/categories");

  return rawData.data;
};

const postNewSkill = async payload => {
  const rawData = await instanceAxios.post("/skills", payload);

  return rawData.data;
};

const getCurrentSkills = async () => {
  const rawData = await instanceAxios.get(`/skills`);

  return rawData.data;
};

const postNewTitle = async (title, cardId) => {
  const rawData = await instanceAxios.post(`/categories/${cardId}`, {
    title: title
  });

  return rawData.data;
};

const postChangingSkill = async (title, percent, cardId, rowId) => {
  const rawData = await instanceAxios.post(`/skills/${rowId}`, {
    title: title,
    percent: percent,
    category: cardId
  });

  return rawData.data;
};

const deleteCard = async cardId => {
  const rawData = await instanceAxios.delete(`/categories/${cardId}`);

  return rawData.data;
};

const deleteSkill = async cardId => {
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

  try {
    const res = yield call(postNewCard, title);
    yield put(skillFetchNewCardSuccessAction(res));
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    yield put(skillFetchNewCardFailureAction(error));
  }
}

export function* skillWorkerGettingAllCards(action) {
  try {
    yield call(skillWorkerGetCurrenSkills);
    const res = yield call(getAllCards);
    yield put(skillGetAllCardsActionSuccess(res));
  } catch (error) {
    yield put(skillGetAllCardsActionFailure(error));
  }
}

export function* skillWorkerAddSkill(action) {
  const { category } = action.payload;

  try {
    const res = yield call(postNewSkill, action.payload);
    yield put(skillGetCurrentSkillsAction(category));
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerGetCurrenSkills() {
  try {
    const res = yield call(getCurrentSkills);
    yield put(skillGetCurrentSkillsSuccessAction(res));
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerChangeTitle(action) {
  const { title, cardId } = action.payload;
  try {
    yield call(postNewTitle, title, cardId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerChangeSkill(action) {
  const { title, percent, cardId, rowId } = action.payload;

  try {
    yield call(postChangingSkill, title, percent, cardId, rowId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerRemoveCard(action) {
  const { cardId } = action.payload;

  try {
    yield call(deleteCard, cardId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}

export function* skillWorkerRemoveSkill(action) {
  const { rowId } = action.payload;

  try {
    yield call(deleteSkill, rowId);
    yield call(skillWorkerGettingAllCards);
  } catch (error) {
    console.log(error);
  }
}
