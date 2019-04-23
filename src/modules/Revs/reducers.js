import {
  revsOpenRedactionCardAction,
  revsCloseRedactionCardAction,
  revsLoadImgAction,
  revsGetAllRevSuccessAction,
  revsRedactCardAction,
  revsDeleteTagAction,
  revsErrorLoadImageAction
} from "./actions";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

const redactionCard = handleActions(
  {
    [revsOpenRedactionCardAction]: (state, action) => ({
      isOpened: true,
      initialState: {
        initialValues: {
          revname: "",
          revocc: "",
          revtext: ""
        },
        currentImg: null,
        currentId: null,
        loadImgError: false
      }
    }),
    [revsRedactCardAction]: (state, action) => ({
      isOpened: true,
      initialState: action.payload
    }),
    [revsCloseRedactionCardAction]: (state, action) => ({
      isOpened: false,
      initialState: {
        initialValues: {
          revname: "",
          revocc: "",
          revtext: ""
        },
        currentImg: null,
        currentId: null,
        loadImgError: false
      }
    }),
    [revsLoadImgAction]: (state, action) => ({
      ...state,
      initialState: {
        ...state.initialState,
        currentImg: action.payload
      }
    }),
    [revsErrorLoadImageAction]: (state, action) => ({
      ...state,
      initialState: {
        ...state.initialState,
        loadImgError: action.payload
      }
    })
  },
  {
    isOpened: false,
    initialState: {
      initialValues: {
        revname: "",
        revocc: "",
        revtext: ""
      },
      currentImg: null,
      currentId: null,
      loadImgError: false
    }
  }
);

const allCards = handleActions(
  {
    [revsGetAllRevSuccessAction]: (state, action) => {
      let res = {};

      action.payload.forEach((elem) => {
        res[elem.id] = elem;
      });

      return res;
    }
  },
  null
);

export const revsCards = combineReducers({
  redactionCard,
  allCards
});
