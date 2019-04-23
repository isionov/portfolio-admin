import { createAction } from "redux-actions";

export const REVS_OPEN_REDACTION_CARD = "REVS/OPEN_REDACTION_CARD";
export const revsOpenRedactionCardAction = createAction(
  REVS_OPEN_REDACTION_CARD
);

export const REVS_CLOSE_REDACTION_CARD = "REVS/CLOSE_REDACTION_CARD";
export const revsCloseRedactionCardAction = createAction(
  REVS_CLOSE_REDACTION_CARD
);

export const REVS_LOAD_IMG = "REVS/LOAD_IMG";
export const revsLoadImgAction = createAction(REVS_LOAD_IMG);

export const REVS_POST_NEW_REV = "REVS/POST_NEW_REV";
export const revsPostNewRevAction = createAction(REVS_POST_NEW_REV);

export const REVS_GET_ALL_REV = "REVS/GET_ALL_REV";
export const revsGetAllRevAction = createAction(REVS_GET_ALL_REV);

export const REVS_GET_ALL_REV_SUCCESS = "REVS/GET_ALL_REV_SUCCESS";
export const revsGetAllRevSuccessAction = createAction(
  REVS_GET_ALL_REV_SUCCESS
);

export const REVS_REDACT_CARD = "REVS/REDACT_CARD";
export const revsRedactCardAction = createAction(REVS_REDACT_CARD);

export const REVS_CHANGE_REV = "REVS/CHANGE_REV";
export const revsChangeRevAction = createAction(REVS_CHANGE_REV);

export const REVS_DELETE_REV = "REVS/DELETE_REV";
export const revsDeleteRevAction = createAction(REVS_DELETE_REV);

export const REVS_ERROR_LOAD_IMG = "REVS/ERROR_LOAD_IMG";
export const revsErrorLoadImageAction = createAction(REVS_ERROR_LOAD_IMG);
