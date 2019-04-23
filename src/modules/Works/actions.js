import { createAction } from "redux-actions";

export const WORKS_OPEN_REDACTION_CARD = "WORKS/OPEN_REDACTION_CARD";
export const worksOpenRedactionCardAction = createAction(
  WORKS_OPEN_REDACTION_CARD
);

export const WORKS_CLOSE_REDACTION_CARD = "WORKS/CLOSE_REDACTION_CARD";
export const worksCloseRedactionCardAction = createAction(
  WORKS_CLOSE_REDACTION_CARD
);

export const WORKS_LOAD_IMG = "WORKS/LOAD_IMG";
export const worksLoadImgAction = createAction(WORKS_LOAD_IMG);

export const WORKS_POST_NEW_WORK = "WORKS/POST_NEW_WORK";
export const worksPostNewWorkAction = createAction(WORKS_POST_NEW_WORK);

export const WORKS_GET_ALL_WORK = "WORKS/GET_ALL_WORK";
export const worksGetAllWorkAction = createAction(WORKS_GET_ALL_WORK);

export const WORKS_GET_ALL_WORK_SUCCESS = "WORKS/GET_ALL_WORK_SUCCESS";
export const worksGetAllWorkSuccessAction = createAction(
  WORKS_GET_ALL_WORK_SUCCESS
);

export const WORKS_REDACT_CARD = "WORKS/REDACT_CARD";
export const worksRedactCardAction = createAction(WORKS_REDACT_CARD);

export const WORKS_CHANGE_WORK = "WORKS/CHANGE_WORK";
export const worksChangeWorkAction = createAction(WORKS_CHANGE_WORK);

export const WORKS_DELETE_WORK = "WORKS/DELETE_WORK";
export const worksDeleteWorkAction = createAction(WORKS_DELETE_WORK);

export const WORKS_DELETE_TAG = "WORKS/DELETE_TAG";
export const worksDeleteTagAction = createAction(WORKS_DELETE_TAG);

export const WORKS_ERROR_LOAD_IMG = "WORKS/ERROR_LOAD_IMG";
export const worksErrorLoadImageAction = createAction(WORKS_ERROR_LOAD_IMG);
