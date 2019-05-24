import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import SectionHeader from "../SectionHeader";
import WorksRedactionCard from "../WorksRedactionCard";
import WorksPreviewCard from "../WorksPreviewCard";
import WorksPreviewCardButton from "../WorksPreviewCardButton";
import { colors, media } from "../../modules/params.js";
import { connect } from "react-redux";
import {
  getWorksRedactionCardOpenStatus,
  getAllWorkCards
} from "../../modules/Works";
import { worksGetAllWorkAction } from "../../modules/Works";

class Works extends Component {
  componentDidMount() {
    const { worksGetAllWorkAction } = this.props;
    worksGetAllWorkAction();
  }

  renderCards = arrCards => {
    let res = [];
    for (const item in arrCards) {
      res.push(
        <WorksPreviewCard key={item} cardState={{ ...arrCards[item] }} />
      );
    }
    return res.length ? res : null;
  };

  render() {
    const { isOpened, allCards } = this.props;
    return (
      <FlexContainer
        customWidth="100%"
        customHeight="100%"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <SectionHeader title="Работы" showButton={false} fontWeight={700} />
        <FlexContainer
          customWidth="100%"
          customHeight="100%"
          alignItems="flex-start"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignContent="flex-start"
        >
          {isOpened ? <WorksRedactionCard /> : null}
          <WorksPreviewCardButton />
          {this.renderCards(allCards)}
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => ({
  isOpened: getWorksRedactionCardOpenStatus(state),
  allCards: getAllWorkCards(state)
});

const mapDispatchToProps = {
  worksGetAllWorkAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Works);
