import { createSelector } from "reselect";
import path from "ramda/src/path";

export const getRevRedactionCardOpenStatus = createSelector(
  [(state) => state.revsCards.redactionCard],
  (redactionCard) => {
    return path(["isOpened"], redactionCard);
  }
);

export const getRevRedactionCardInitState = createSelector(
  [(state) => state.revsCards.redactionCard],
  (redactionCard) => {
    return path(["initialState"], redactionCard);
  }
);

export const getAllRevCards = createSelector(
  [(state) => state.revsCards.allCards],
  (allCards) => allCards
);

export const getLoadImgError = createSelector(
  [(state) => state.revsCards.redactionCard],
  (redactionCard) => {
    return path(["initialState", "loadImgError"], redactionCard);
  }
);
