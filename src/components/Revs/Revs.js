import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import SectionHeader from "../SectionHeader";
import RevsRedactionCard from "../RevsRedactionCard";
import RevsPreviewCard from "../RevsPreviewCard";
import RevsPreviewCardButton from "../RevsPreviewCardButton";
import { connect } from "react-redux";
import {
  getAllRevCards,
  getRevRedactionCardOpenStatus
} from "../../modules/Revs";
import { revsGetAllRevAction } from "../../modules/Revs";

class Revs extends Component {
  componentDidMount() {
    const { revsGetAllRevAction } = this.props;
    revsGetAllRevAction();
  }

  renderCards = arrCards => {
    let res = [];
    for (const item in arrCards) {
      res.push(<RevsPreviewCard key={item} cardState={arrCards[item]} />);
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
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <SectionHeader title="Отзывы" showButton={false} fontWeight={700} />
        <FlexContainer
          customWidth="100%"
          customHeight="100%"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexWrap="wrap"
          alignContent="flex-start"
        >
          {isOpened ? <RevsRedactionCard /> : null}
          <RevsPreviewCardButton />
          {this.renderCards(allCards)}
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => ({
  isOpened: getRevRedactionCardOpenStatus(state),
  allCards: getAllRevCards(state)
});

const mapDispatchToProps = {
  revsGetAllRevAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Revs);
