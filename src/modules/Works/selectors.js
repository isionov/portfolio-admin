import { createSelector } from "reselect";
import path from "ramda/src/path";

export const getWorksRedactionCardOpenStatus = createSelector(
  [state => state.workCards.redactionCard],
  redactionCard => {
    return path(["isOpened"], redactionCard);
  }
);

export const getWorksRedactionCardInitState = createSelector(
  [state => state.workCards.redactionCard],
  redactionCard => {
    return path(["initialState"], redactionCard);
  }
);

export const getAllWorkCards = createSelector(
  [state => state.workCards.allCards],
  allCards => allCards
);

export const getLoadImgError = createSelector(
  [state => state.workCards.redactionCard],
  redactionCard => {
    return path(["initialState", "loadImgError"], redactionCard);
  }
);

export const getOldTags = state =>
  path(
    [
      "workCards",
      "redactionCard",
      "initialState",
      "initialValues",
      "oldworktags"
    ],
    state
  );
