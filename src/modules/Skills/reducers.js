import {
  skillOpenNewCardAction,
  skillCloseNewCardAction,
  skillEditNewCardAction,
  skillStopEditNewCardAction,
  skillFetchNewCardSuccessAction,
  skillFetchNewCardFailureAction,
  skillGetAllCardsActionSuccess,
  skillGetAllCardsActionFailure,
  skillGetCurrentSkillsSuccessAction,
  skillStartCardEditingAction,
  skillStopCardEditingAction
} from "./actions";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

const newCard = handleActions(
  {
    [skillOpenNewCardAction]: (state, action) => ({ ...state, isOpened: true }),
    [skillCloseNewCardAction]: (state, action) => ({
      ...state,
      isOpened: false
    }),

    [skillFetchNewCardSuccessAction]: (state, action) => ({
      ...state,
      isSucceeded: action.payload
    }),
    [skillGetAllCardsActionFailure]: (state, action) => ({
      ...state,
      isFailured: action.payload
    })
  },
  {
    isOpened: false,
    title: "",
    isSucceeded: "",
    isFailured: ""
  }
);

const skillCardsContent = handleActions(
  {
    [skillGetAllCardsActionSuccess]: (state, action) => ({
      ...state,
      skillCardList: action.payload
    }),
    [skillGetAllCardsActionFailure]: (state, action) => ({
      ...state,
      skillCardListError: action.payload
    }),
    [skillGetCurrentSkillsSuccessAction]: (state, action) => ({
      ...state,
      skillList: action.payload
    }),
    [skillStartCardEditingAction]: (state, action) => {
      const { cardId, rowId } = action.payload;
      const editingCards = state.editingCards;
      return {
        ...state,
        editingCards: {
          ...editingCards,
          [cardId]: {
            rowId: rowId
          }
        }
      };
    },
    [skillStopCardEditingAction]: (state, action) => {
      const { cardId } = action.payload;
      const editingCards = state.editingCards;
      return {
        ...state,
        editingCards: {
          ...editingCards,
          [cardId]: {
            rowId: null
          }
        }
      };
    }
  },
  { skillCardList: [], skillCardListError: "", skillList: [], editingCards: {} }
);

export const skillCards = combineReducers({
  newCard,
  skillCardsContent
});
