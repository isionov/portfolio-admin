import React, { Component } from "react";
import SkillCard from "../SkillCard";
import FlexContainer from "../FlexContainer";
import Container from "../Container";
import SectionHeader from "../SectionHeader";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getNewCardOpenStatus,
  getAllCardList,
  getAllSkillList,
  getNewCardTitle
} from "../../modules/Skills";
import {
  skillGetAllCardsAction,
  skillGetCurrentSkillsAction
} from "../../modules/Skills";

const StyledFlexContainer = styled(FlexContainer)`
  padding: 0 0 0 0;
`;

const createInitState = (category, skillList, idCard) => {
  let res = {};

  res[idCard + "_head_title"] = category;
  skillList.forEach((elem) => {
    res[elem.id + "_row_title"] = elem.title;
    res[elem.id + "_row_percent"] = elem.percent;
  });

  return res;
};

const createSkillArr = (idCard, arr) => {
  let skillListReordered = [];
  arr.forEach((elem) => {
    if (elem.category === idCard) {
      skillListReordered.push({
        id: elem.id + "_row",
        firstName: elem.id + "_row_title",
        secondName: elem.id + "_row_percent"
      });
    }
  });

  return skillListReordered;
};

const renderCreatedCards = (skillCardList, skillList) => {
  return skillCardList.map((item) => {
    const { category, id } = item;
    let preparedinitialValues = createInitState(category, skillList, id);
    let newCustomSkills = createSkillArr(id, skillList);

    return (
      <SkillCard
        key={item.id}
        cardId={item.id}
        skillList={newCustomSkills}
        initialValues={preparedinitialValues}
      />
    );
  });
};

class About extends Component {
  componentDidMount() {
    const { skillGetAllCardsAction } = this.props;
    skillGetAllCardsAction();
  }

  render() {
    const { isOpened, skillCardList, skillList, newCardTitle } = this.props;
    const newCardId = "new";
    const initialValues = { [newCardId + "_head_title"]: newCardTitle };
    return (
      <StyledFlexContainer
        customWidth="100%"
        customHeight="100%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <SectionHeader title="Обо мне" showButton={true} fontWeight={700} />
        <FlexContainer
          customWidth="100%"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexWrap="wrap"
          alignContent="flex-start"
        >
          {isOpened ? (
            <SkillCard
              cardId={newCardId}
              newCard={true}
              initialValues={initialValues}
            />
          ) : null}
          {renderCreatedCards(skillCardList, skillList)}
        </FlexContainer>
      </StyledFlexContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpened: getNewCardOpenStatus(state),
  skillCardList: getAllCardList(state),
  skillList: getAllSkillList(state),
  newCardTitle: getNewCardTitle(state)
});

const mapDispatchToProps = {
  skillGetAllCardsAction,
  skillGetCurrentSkillsAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
