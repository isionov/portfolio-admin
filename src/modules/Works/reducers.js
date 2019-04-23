import {
  worksOpenRedactionCardAction,
  worksCloseRedactionCardAction,
  worksLoadImgAction,
  worksGetAllWorkSuccessAction,
  worksRedactCardAction,
  worksDeleteTagAction,
  worksErrorLoadImageAction
} from "./actions";
import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

const deleteTag = (tag, allTags) => {
  let indexStart = allTags.indexOf(tag, 0);
  let indexEnd = tag.length;
  console.log(indexStart, indexEnd);
  const res = Array.prototype.reduce.call(
    allTags,
    function(accumulator, currentValue, index) {
      console.log("reducer", accumulator, currentValue, index);
      if (index < indexStart || index > indexStart + indexEnd)
        accumulator += currentValue;
      return accumulator;
    },
    ""
  );
  return res;
};

const redactionCard = handleActions(
  {
    [worksOpenRedactionCardAction]: (state, action) => ({
      isOpened: true,
      initialState: {
        initialValues: {
          workname: "",
          worklink: "",
          workdesc: "",
          worktags: "",
          oldworktags: ""
        },
        currentImg: null,
        currentId: null,
        loadImgError: false
      }
    }),
    [worksRedactCardAction]: (state, action) => ({
      isOpened: true,
      initialState: action.payload
    }),
    [worksCloseRedactionCardAction]: (state, action) => ({
      isOpened: false,
      initialState: {
        initialValues: {
          workname: "",
          worklink: "",
          workdesc: "",
          worktags: "",
          oldworktags: ""
        },
        currentImg: null,
        currentId: null,
        loadImgError: false
      }
    }),
    [worksErrorLoadImageAction]: (state, action) => ({
      ...state,
      initialState: {
        ...state.initialState,
        loadImgError: action.payload
      }
    }),
    [worksLoadImgAction]: (state, action) => ({
      ...state,
      initialState: {
        ...state.initialState,
        currentImg: action.payload
      }
    }),
    [worksDeleteTagAction]: (state, action) => {
      const oldTags = state.initialState.initialValues.oldworktags;
      const deletingTag = action.payload;
      const newtags = deleteTag(deletingTag, oldTags);
      return {
        ...state,
        initialState: {
          ...state.initialState,
          initialValues: {
            ...state.initialState.initialValues,
            oldworktags: newtags
          }
        }
      };
    }
  },
  {
    isOpened: false,
    initialState: {
      initialValues: {
        workname: "",
        worklink: "",
        workdesc: "",
        worktags: "",
        oldworktags: ""
      },
      currentImg: null,
      currentId: null,
      loadImgError: false
    }
  }
);

const allCards = handleActions(
  {
    [worksGetAllWorkSuccessAction]: (state, action) => {
      let res = {};

      action.payload.forEach(elem => {
        res[elem.id] = elem;
      });

      return res;
    }
  },
  null
);

export const workCards = combineReducers({
  redactionCard,
  allCards
});
