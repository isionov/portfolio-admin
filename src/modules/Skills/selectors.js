import { createSelector } from "reselect";
import path from "ramda/src/path";

export const getNewCardOpenStatus = createSelector(
  [state => state.skillCards.newCard],
  newCard => {
    return path(["isOpened"], newCard);
  }
);

export const getNewCardTitle = createSelector(
  [state => state.skillCards.newCard],
  newCard => {
    return path(["title"], newCard);
  }
);

export const getAllCardList = createSelector(
  [state => state.skillCards.skillCardsContent],
  skillCardsContent => {
    return path(["skillCardList"], skillCardsContent);
  }
);

export const getAllSkillList = createSelector(
  [state => state.skillCards.skillCardsContent],
  skillCardsContent => {
    return path(["skillList"], skillCardsContent);
  }
);

export const getEditingRow = state => cardId =>
  path(
    ["skillCards", "skillCardsContent", "editingCards", `${cardId}`, "rowId"],
    state
  );
