import { loginSuccess, loginFailure, loginReset, savePromise } from "./actions";
import { handleActions } from "redux-actions";

export const loggedIn = handleActions(
  {
    [loginSuccess]: (state, action) => action.payload,
    [savePromise]: (state, action) => ({ ...state, promise: action.payload }),
    [loginFailure]: (state, action) => action.payload,
    [loginReset]: (state, action) => ({
      success: false,
      id: "",
      message: ""
    })
  },
  {
    success: false,
    id: "",
    message: ""
  }
);
