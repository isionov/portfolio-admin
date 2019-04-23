import { loginSuccess, loginFailure, loginReset } from "./actions";
import { handleActions } from "redux-actions";

export const loggedIn = handleActions(
  {
    [loginSuccess]: (state, action) => action.payload,
    [loginFailure]: (state, action) => action.payload,
    [loginReset]: (state, action) => ({
      success: false,
      // token: "",
      id: "",
      error: ""
    })
  },
  {
    success: false,
    // token: "",
    id: "",
    error: ""
  }
);
