import React, { Component } from "react";
import FieldCustom from "../FieldCustom";
import FlexContainer from "../FlexContainer";
import Button from "../Button";
import add from "../../images/icons/Add.svg";
import pencil from "../../images/icons/Pencil.svg";
import tick from "../../images/icons/Tick.svg";
import trash from "../../images/icons/Trash.svg";
import cross from "../../images/icons/Cross.svg";
import Icon from "../Icon";
import { colors, media } from "../../modules/params.js";
import RoundAddButton from "../RoundAddButton";
import { connect } from "react-redux";
import { getNewCardOpenStatus, getEditingRow } from "../../modules/Skills";
import {
  skillCloseNewCardAction,
  skillStartCardEditingAction,
  skillStopCardEditingAction,
  skillRemoveCardAction,
  skillRemoveSkillAction
} from "../../modules/Skills";
import styled from "styled-components";

const StyledFlexWrapper = styled(FlexContainer)`
  padding: 5px 0 5px 0;
  margin: 0 0 0 0;
`;

const StyledRoundAddButton = styled(RoundAddButton)`
  @media (max-width: ${`${media.tablets}`}) {
    margin-left: 15px;
  }
`;

const StyledButton = styled(Button)`
  margin: 0 0 0 auto;
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  @media (max-width: ${`${media.tablets}`}) {
    margin-left: 15px;
  }
`;

const StyledRightButton = styled(StyledButton)`
  margin-left: 15px;
  flex-shrink: 0;
`;

const StyledFlexWrapperPercent = styled(FlexContainer)`
  flex-shrink: 0;
  &:after {
    content: "%";
    display: inline-block;
  }

  @media (max-width: ${`${media.tablets}`}) {
    margin-left: auto;
  }
`;

const StyledFlexWrapperSkill = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    width: unset;
    flex-basis: auto;
  }
`;

const presetsSkill = {
  title: "",
  iconItem: null,
  inputCustom: { type: "text" },
  simple: true
};
const presetsSkillValue = {
  title: "",
  iconItem: null,
  inputCustom: { type: "text" },
  simple: true
};

class SkillRow extends Component {
  state = {
    isRowInputsEditing: false
  };

  handleClickRoundBtn = e => {
    const {
      submit,
      resetFieldMutator,
      isOpenedNewCard,
      newCard,
      skillCloseNewCardAction,
      error,
      nameFirst,
      nameSecond,
      getEditingRow,
      rowId,
      cardId,
      skillStartCardEditingAction,
      skillStopCardEditingAction
    } = this.props;

    const editingRow = getEditingRow(cardId);

    if (!editingRow) {
      submit();

      if (!error[nameFirst] && !error[nameSecond]) {
        resetFieldMutator(nameFirst);
        resetFieldMutator(nameSecond);
      }
    } else {
      resetFieldMutator(nameFirst);
      resetFieldMutator(nameSecond);
    }
  };

  handleClickFirstButton = e => {
    const {
      submit,
      resetFieldMutator,
      isOpenedNewCard,
      newCard,
      skillCloseNewCardAction,
      error,
      nameFirst,
      nameSecond,
      getEditingRow,
      rowId,
      cardId,
      skillStartCardEditingAction,
      skillStopCardEditingAction
    } = this.props;

    const { isRowInputsEditing } = this.state;
    const editingRow = getEditingRow(cardId);

    if (!isRowInputsEditing && !editingRow) {
      skillStartCardEditingAction({ cardId, rowId });
      this.setState({ isRowInputsEditing: true });
    }

    if (isRowInputsEditing) {
      resetFieldMutator(cardId + "_add_skill");
      resetFieldMutator(cardId + "_add_level");
      submit();
      if (newCard) {
        if (nameFirst) resetFieldMutator(nameFirst);
        if (nameSecond) resetFieldMutator(nameSecond);
      }
      if (!error[nameFirst] && !error[nameSecond]) {
        this.setState({ isRowInputsEditing: false });
      }
    }
  };

  handleClickSecondButton = e => {
    const {
      submit,
      resetFieldMutator,
      isOpenedNewCard,
      newCard,
      skillCloseNewCardAction,
      nameFirst,
      nameSecond,
      getEditingRow,
      rowId,
      cardId,
      skillStartCardEditingAction,
      skillStopCardEditingAction,
      skillRemoveCardAction,
      skillRemoveSkillAction
    } = this.props;
    const { isRowInputsEditing } = this.state;
    const editingRow = getEditingRow(cardId);

    const flagHead =
      editingRow && (editingRow + "").split("_")[1] === "head" ? true : false;
    const flagRow =
      editingRow && (editingRow + "").split("_")[1] === "row" ? true : false;

    if (isRowInputsEditing && editingRow) {
      skillStopCardEditingAction({ cardId });
      this.setState({ isRowInputsEditing: false });
      if (nameFirst) resetFieldMutator(nameFirst);
      if (nameSecond) resetFieldMutator(nameSecond);
    }

    if (newCard && !isRowInputsEditing) {
      skillCloseNewCardAction();
    } else if (!isRowInputsEditing && !editingRow) {
      const head = (rowId + "").split("_")[1] === "head" ? true : false;
      const row = (rowId + "").split("_")[1] === "row" ? true : false;

      if (head) {
        skillRemoveCardAction({ cardId: cardId });
      } else {
        const numberPartRowId = (rowId + "").split("_")[0];

        skillRemoveSkillAction({ rowId: numberPartRowId });
      }
    }
  };

  render() {
    const {
      newCard,
      hovered,
      freez,
      submitting,
      simple,
      nameFirst,
      nameSecond,
      placeholderFirst,
      placeholderSecond,
      addSkill,
      getEditingRow,
      dunamicHovered
    } = this.props;

    const { isRowInputsEditing } = this.state;

    return (
      <StyledFlexWrapper customWidth="95%" justifyContent="space-between">
        <StyledFlexWrapperSkill customWidth={addSkill ? `180px` : `220px`}>
          <FieldCustom
            dunamicHovered={dunamicHovered}
            placeholder={placeholderFirst}
            name={nameFirst}
            id={nameFirst}
            presets={presetsSkill}
            freez={freez || (!isRowInputsEditing && !addSkill)}
            hovered={hovered}
          />
        </StyledFlexWrapperSkill>
        {simple ? null : (
          <StyledFlexWrapperPercent customWidth="60px">
            <FieldCustom
              dunamicHovered={dunamicHovered}
              placeholder={placeholderSecond}
              name={nameSecond}
              id={nameSecond}
              presets={presetsSkillValue}
              freez={freez || (!isRowInputsEditing && !addSkill)}
              hovered={hovered}
            />
          </StyledFlexWrapperPercent>
        )}
        {addSkill ? (
          <StyledRoundAddButton
            handlerOnClick={this.handleClickRoundBtn}
            disabled={submitting || newCard}
            type="button"
            width="40px"
            height="40px"
            iconItem={add}
            margin="0 0 0 30px"
          />
        ) : (
          <>
            <StyledButton
              onClick={this.handleClickFirstButton}
              type="button"
              disabled={submitting}
              backType="svg"
            >
              <Icon
                fill={`${
                  isRowInputsEditing
                    ? colors.commonEditingAccept
                    : colors.commonDarkColor
                }`}
                stroke={`${
                  isRowInputsEditing
                    ? colors.commonEditingAccept
                    : colors.commonDarkColor
                }`}
                iconItem={isRowInputsEditing ? tick : pencil}
                strokeWidth="0"
                preserveAspectRatio="none"
              />
            </StyledButton>
            <StyledRightButton
              onClick={this.handleClickSecondButton}
              disabled={submitting}
              type="button"
              backType="svg"
            >
              <Icon
                fill={`${
                  isRowInputsEditing
                    ? colors.commonEditingDecline
                    : colors.commonDarkColor
                }`}
                stroke={`${
                  isRowInputsEditing
                    ? colors.commonEditingDecline
                    : colors.commonDarkColor
                }`}
                iconItem={isRowInputsEditing ? cross : trash}
                strokeWidth="0"
                preserveAspectRatio="none"
              />
            </StyledRightButton>
          </>
        )}
      </StyledFlexWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isOpenedNewCard: getNewCardOpenStatus(state),
  getEditingRow: getEditingRow(state)
});

const mapDispatchToProps = {
  skillCloseNewCardAction,
  skillStartCardEditingAction,
  skillStopCardEditingAction,
  skillRemoveCardAction,
  skillRemoveSkillAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillRow);
