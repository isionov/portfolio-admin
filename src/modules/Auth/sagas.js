import { takeEvery, call, put } from "redux-saga/effects";
import {
  loginSuccess,
  loginFailure,
  handleLoginSubmit,
  loginReset
} from "./actions";
import instanceAxios from "../initApi.js";

const auth = async (login, password) => {
  const rawData = await instanceAxios.post("/login", {
    name: login,
    password: password
  });
  const { token, message, err } = rawData.data;

  instanceAxios.defaults.headers["Authorization"] =
    "Bearer " + rawData.data.token;

  if (err) return { err, message };

  const rawDataUser = await instanceAxios.get("/user");
  const id = rawDataUser.data.user.id;

  return { token, id };
};

const logout = async (login, password) => {
  const rawData = await instanceAxios.post("/logout");
};

export function* authWatcher() {
  yield takeEvery(handleLoginSubmit, authWorker);
  yield takeEvery(loginReset, logoutWorker);
}

export function* authWorker(action) {
  const { login, password } = action.payload;
  try {
    const res = yield call(auth, login, password);
    const { err, message } = res;
    if (err) {
      yield put(
        loginFailure({
          success: false,
          message
        })
      );
    } else {
      localStorage.setItem("tkn", res.token);
      localStorage.setItem("id", res.id);
      yield put(
        loginSuccess({
          success: true,
          id: res.id
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* logoutWorker(action) {
  let stateOfAxios = instanceAxios.defaults.headers["Authorization"];
  try {
    if (stateOfAxios) {
      const res = yield call(logout);
      instanceAxios.defaults.headers["Authorization"] = "";
    }

    localStorage.setItem("tkn", "");
    localStorage.setItem("id", "");
  } catch (error) {
    console.log(error);
  }
}
