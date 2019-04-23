import { createAction } from "redux-actions";

export const SKILLS_OPEN_NEW_CARD = "SKILLS/OPEN_NEW_CARD";
export const SKILLS_CLOSE_NEW_CARD = "SKILLS/CLOSE_NEW_CARD";

export const skillOpenNewCardAction = createAction(SKILLS_OPEN_NEW_CARD);
export const skillCloseNewCardAction = createAction(SKILLS_CLOSE_NEW_CARD);

// export const SKILLS_EDIT_NEW_CARD = "SKILLS/EDIT_NEW_CARD";
// export const SKILLS_STOP_EDIT_NEW_CARD = "SKILLS/STOP_EDIT_NEW_CARD";

export const SKILLS_FETCH_NEW_CARD = "SKILLS/FETCH_NEW_CARD";

export const skillFetchNewCardAction = createAction(SKILLS_FETCH_NEW_CARD);

export const SKILLS_FETCH_NEW_CARD_SUCCESS = "SKILLS/FETCH_NEW_CARD_SUCCESS";
export const SKILLS_FETCH_NEW_CARD_FAILURE = "SKILLS/FETCH_NEW_CARD_FAILURE";

export const skillFetchNewCardSuccessAction = createAction(
  SKILLS_FETCH_NEW_CARD_SUCCESS
);
export const skillFetchNewCardFailureAction = createAction(
  SKILLS_FETCH_NEW_CARD_FAILURE
);

export const SKILLS_GET_ALL_CARDS = "SKILLS/GET_ALL_CARDS";

export const skillGetAllCardsAction = createAction(SKILLS_GET_ALL_CARDS);

export const SKILLS_GET_ALL_CARDS_SUCCESS = "SKILLS/GET_ALL_CARDS_SUCCESS";
export const SKILLS_GET_ALL_CARDS_FAILURE = "SKILLS/GET_ALL_CARDS_FAILURE";

export const skillGetAllCardsActionSuccess = createAction(
  SKILLS_GET_ALL_CARDS_SUCCESS
);

export const skillGetAllCardsActionFailure = createAction(
  SKILLS_GET_ALL_CARDS_FAILURE
);

// export const skillEditNewCardAction = createAction(SKILLS_EDIT_NEW_CARD);
// export const skillStopEditNewCardAction = createAction(
//   SKILLS_STOP_EDIT_NEW_CARD
// );

export const SKILLS_FETCH_NEW_SKILL = "SKILLS/FETCH_NEW_SKILL";

export const skillFetchNewSkill = createAction(SKILLS_FETCH_NEW_SKILL);

export const SKILLS_GET_CURRENT_SKILLS = "SKILLS/GET_CURRENT_SKILLS";

export const skillGetCurrentSkillsAction = createAction(
  SKILLS_GET_CURRENT_SKILLS
);

export const SKILLS_GET_CURRENT_SKILLS_SUCCESS =
  "SKILLS/GET_CURRENT_SKILLS_SUCCESS";

export const skillGetCurrentSkillsSuccessAction = createAction(
  SKILLS_GET_CURRENT_SKILLS_SUCCESS
);

export const SKILLS_START_CARD_EDITING = "SKILLS/START_CARD_EDITING";

export const skillStartCardEditingAction = createAction(
  SKILLS_START_CARD_EDITING
);

export const SKILLS_STOP_CARD_EDITING = "SKILLS/STOP_CARD_EDITING";

export const skillStopCardEditingAction = createAction(
  SKILLS_STOP_CARD_EDITING
);

export const SKILLS_FETCH_CHANGE_TITLE = "SKILLS/FETCH_CHANGE_TITLE";

export const skillFetchChangeTitleAction = createAction(
  SKILLS_FETCH_CHANGE_TITLE
);

export const SKILLS_FETCH_CHANGE_SKILL = "SKILLS/FETCH_CHANGE_SKILL";

export const skillFetchChangeSkillAction = createAction(
  SKILLS_FETCH_CHANGE_SKILL
);

export const SKILLS_REMOVE_CARD = "SKILLS/REMOVE_CARD";

export const skillRemoveCardAction = createAction(SKILLS_REMOVE_CARD);

export const SKILLS_REMOVE_SKILL = "SKILLS/REMOVE_SKILL";

export const skillRemoveSkillAction = createAction(SKILLS_REMOVE_SKILL);
