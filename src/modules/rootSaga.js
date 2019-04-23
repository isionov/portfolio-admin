import { fork } from "redux-saga/effects";
import { authWatcher } from "./Auth";
import { skillWatcher } from "./Skills";
import { workWatcher } from "./Works";
import { revWatcher } from "./Revs";

function* rootSaga() {
  yield fork(authWatcher);
  yield fork(skillWatcher);
  yield fork(workWatcher);
  yield fork(revWatcher);
}

export default rootSaga;
