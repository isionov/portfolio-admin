import React, { Component } from "react";
import SkillRow from "../SkillRow";
import FlexContainer from "../FlexContainer";
import FormCustom from "../FormCustom";
import { Form, Field } from "react-final-form";
import { colors, media } from "../../modules/params";
import {
  skillFetchNewCardAction,
  skillFetchNewSkill,
  skillGetCurrentSkillsAction,
  skillFetchChangeTitleAction,
  skillStopCardEditingAction,
  skillFetchChangeSkillAction
} from "../../modules/Skills";
import { getEditingRow } from "../../modules/Skills";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledFlexWrapper = styled(FlexContainer)`
  margin: 0 0 2.5% 3%;
  padding: 10px;
  background: ${colors.commonBackgroundColorCard};
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    margin-left: 0;
  }
`;

const StyledFlexWrapperTitle = styled(FlexContainer)`
  border-bottom: ${`1px solid ${colors.commonLightColor}`};
`;

const StyledFlexWrapperSkills = styled(FlexContainer)`
  padding: 15px 0 0 0;
  overflow: auto;
`;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function properPercent(p) {
  return (!isNumeric(p) || p < 0 || p > 100) && (p ^ 0) !== p;
}

class SkillCard extends Component {
  onSubmitForm = (values) => {
    const {
      newCard,
      skillFetchNewCardAction,
      skillFetchNewSkill,
      cardId,
      initialValues,
      getEditingRow,
      skillFetchChangeTitleAction,
      skillStopCardEditingAction,
      skillFetchChangeSkillAction
    } = this.props;

    const editingRow = getEditingRow(cardId);
    const numberPartEditingRowId = parseInt((editingRow + "").split("_")[0]);

    const flagHead =
      editingRow && (editingRow + "").split("_")[1] === "head" ? true : false;
    const flagAdd = !editingRow ? true : false;
    const flagRow =
      editingRow && (editingRow + "").split("_")[1] === "row" ? true : false;

    const initialTitle = initialValues[editingRow + "_title"];
    const initialPercent = initialValues[editingRow + "_percent"];
    const rowTitle = values[editingRow + "_title"];
    const rowPercent = values[editingRow + "_percent"];
    const addingSkill = values[cardId + "_add_skill"];
    const addingLevel = values[cardId + "_add_level"];

    if (newCard) {
      const reqPayload = { title: rowTitle };

      skillFetchNewCardAction(reqPayload);
      skillStopCardEditingAction({ cardId });
    } else if (flagAdd) {
      skillFetchNewSkill({
        title: addingSkill,
        percent: parseInt(addingLevel),
        category: cardId
      });
    } else if (flagHead) {
      if (rowTitle !== initialTitle)
        skillFetchChangeTitleAction({
          title: rowTitle,
          cardId: cardId
        });

      skillStopCardEditingAction({ cardId });
    } else if (flagRow) {
      if (rowTitle !== initialTitle || rowPercent !== initialPercent) {
        skillFetchChangeSkillAction({
          rowId: numberPartEditingRowId,
          cardId: cardId,
          title: rowTitle,
          percent: rowPercent
        });
      }
      skillStopCardEditingAction({ cardId });
    }

    skillStopCardEditingAction({ cardId });
  };

  validateCallback = (values) => {
    const errors = {};
    const { newCard, cardId, getEditingRow } = this.props;

    const editingRow = getEditingRow(cardId);
    const flagHead =
      editingRow && (editingRow + "").split("_")[1] === "head" ? true : false;

    const rowTitle = values[editingRow + "_title"];
    const rowPercent = values[editingRow + "_percent"];
    const addingSkill = values[cardId + "_add_skill"];
    const addingLevel = values[cardId + "_add_level"];

    if (newCard && !rowTitle) {
      errors[editingRow + "_title"] = "Необходимо заполнить";
    }

    if (!newCard && !editingRow) {
      if (addingSkill && !addingLevel) {
        errors[cardId + "_add_level"] = "Необходимо заполнить";
      } else if (!addingSkill && addingLevel) {
        errors[cardId + "_add_skill"] = "Необходимо заполнить";
      } else if (addingSkill && properPercent(addingLevel)) {
        errors[cardId + "_add_level"] = "Проценты указаны неверно";
      }
    }
    if (!newCard && editingRow) {
      if (!rowTitle) {
        errors[editingRow + "_title"] = "Необходимо заполнить";
      }
      if (!flagHead && !rowPercent) {
        errors[editingRow + "_percent"] = "Необходимо заполнить";
      } else if (!flagHead && properPercent(rowPercent)) {
        errors[editingRow + "_percent"] = "Проценты указаны неверно";
      }
    }

    return errors;
  };

  render() {
    const { newCard, item, initialValues, skillList, cardId } = this.props;

    return (
      <StyledFlexWrapper customWidth="45%">
        <Form
          mutators={{
            resetFieldMutator: (args, state, methods) => {
              let initVal = state.formState.initialValues[args[0]];
              methods.changeValue(state, args[0], (value) => initVal);
            }
          }}
          initialValues={initialValues}
          validate={this.validateCallback}
          onSubmit={this.onSubmitForm}
        >
          {({ handleSubmit, submitting, values, ...other }) => (
            <FormCustom
              justifyContent={`flex-start`}
              padding={`20px`}
              onSubmit={handleSubmit}
            >
              <StyledFlexWrapperTitle customWidth="100%">
                <SkillRow
                  cardId={cardId}
                  rowId={cardId + "_head"}
                  newCard={newCard}
                  placeholderFirst="Название новой группы"
                  hovered={true}
                  simple={true}
                  nameFirst={cardId + "_head_title"}
                  freez={false}
                  submit={other.form.submit}
                  error={other.errors}
                  resetFieldMutator={other.form.mutators.resetFieldMutator}
                />
              </StyledFlexWrapperTitle>
              <StyledFlexWrapperSkills
                flexDirection={`column`}
                customWidth="100%"
                customHeight="180px"
                justifyContent={`flex-start`}
              >
                {newCard
                  ? null
                  : skillList.map((item) => {
                      return (
                        <SkillRow
                          dunamicHovered={true}
                          cardId={cardId}
                          rowId={item.id}
                          nameFirst={item.firstName}
                          nameSecond={item.secondName}
                          key={item.id}
                          freez={false}
                          submit={other.form.submit}
                          error={other.errors}
                          resetFieldMutator={
                            other.form.mutators.resetFieldMutator
                          }
                        />
                      );
                    })}
              </StyledFlexWrapperSkills>
              <FlexContainer alignSelf="flex-end">
                <SkillRow
                  rowId={cardId + "_add"}
                  cardId={cardId}
                  newCard={newCard}
                  hovered={true}
                  nameFirst={cardId + "_add_skill"}
                  nameSecond={cardId + "_add_level"}
                  placeholderFirst="Новый навык"
                  placeholderSecond="100"
                  addSkill={true}
                  freez={newCard}
                  submit={other.form.submit}
                  error={other.errors}
                  resetFieldMutator={other.form.mutators.resetFieldMutator}
                />
              </FlexContainer>
            </FormCustom>
          )}
        </Form>
      </StyledFlexWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  getEditingRow: getEditingRow(state)
});

const mapDispatchToProps = {
  skillFetchNewCardAction,
  skillFetchNewSkill,
  skillGetCurrentSkillsAction,
  skillFetchChangeTitleAction,
  skillStopCardEditingAction,
  skillFetchChangeSkillAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkillCard);
