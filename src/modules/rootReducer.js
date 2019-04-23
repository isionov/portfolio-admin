import { combineReducers } from "redux";
import { loggedIn } from "./Auth";
import { skillCards } from "./Skills";
import { workCards } from "./Works";
import { revsCards } from "./Revs";

export default combineReducers({
  loggedIn,
  skillCards,
  workCards,
  revsCards
});
