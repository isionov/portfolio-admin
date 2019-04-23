import React, { Component } from "react";
import { colors, media } from "../../modules/params.js";
import FlexContainer from "../FlexContainer";
import TextCustom from "../TextCustom";
import RoundAddButton from "../RoundAddButton";
import add from "../../images/icons/Add.svg";
import { connect } from "react-redux";
import { worksOpenRedactionCardAction } from "../../modules/Works";
import styled from "styled-components";

const StyledFlexContainer = styled(FlexContainer)`
  background: ${`linear-gradient(
  to right,
  ${colors.commonColorAddBtnFirst},
  ${colors.commonColorAddBtnSecond}
)`};
  width: 30%;
  min-height: 555px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 30px 2%;
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};
  cursor: pointer;

  @media (max-width: ${`${media.tablets}`}) {
    width: 45%;
    margin: 0 0 30px 2.5%;
  }

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    flex-direction: row;
    min-height: 110px;
    justify-content: flex-start;
    padding: 20px;
  }
`;

const StyledTextCustom = styled(TextCustom)`
  width: 40%;
  margin: 30px 0 0 0;
  color: ${colors.commonColorAddBtnThird};
  font-weight: 700;
  text-align: center;
  font-size: 18px;

  @media (max-width: ${`${media.tablets}`}) {
    font-size: 17px;
  }

  @media (max-width: ${`${media.phones}`}) {
    margin: 0;
    padding: 0;
    width: auto;
    margin-left: 20px;
    font-size: 16px;
  }
`;

const StyledRoundAddButton = styled(RoundAddButton)`
  @media (max-width: ${`${media.phones}`}) {
    width: 40px;
    height: 40px;
    padding: ${`${(2 * parseFloat(40)) / 8 + "px" || ""}`};
  }
`;

class WorksPreviewCardButton extends Component {
  clickHandler = event => {
    const { worksOpenRedactionCardAction } = this.props;
    worksOpenRedactionCardAction();
  };

  render() {
    return (
      <StyledFlexContainer onClick={this.clickHandler}>
        <StyledRoundAddButton
          handlerOnClick={this.clickHandler}
          type="button"
          large={true}
          iconItem={add}
        />

        <StyledTextCustom>Добавить работу</StyledTextCustom>
      </StyledFlexContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  worksOpenRedactionCardAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorksPreviewCardButton);
