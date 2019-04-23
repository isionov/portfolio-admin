import { createAction } from "redux-actions";

export const AUTH_LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH/LOGIN_FAILURE";
export const AUTH_LOGIN_RESET = "AUTH/LOGIN_RESET";
export const AUTH_HANDLE_LOGIN_SUBMIT = "AUTH/HANDLE_LOGIN_SUBMIT";

export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS);
export const loginFailure = createAction(AUTH_LOGIN_FAILURE);
export const loginReset = createAction(AUTH_LOGIN_RESET);
export const handleLoginSubmit = createAction(AUTH_HANDLE_LOGIN_SUBMIT);
