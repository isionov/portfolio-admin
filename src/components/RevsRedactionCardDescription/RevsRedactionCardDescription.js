import React, { Component } from "react";
import { colors, media } from "../../modules/params.js";
import SimpleCustomField from "../SimpleCustomField";
import FlexContainer from "../FlexContainer";
import RectButton from "../RectButton";
import { connect } from "react-redux";
import { revsCloseRedactionCardAction } from "../../modules/Revs";
import { getRevRedactionCardInitState } from "../../modules/Revs";
import styled from "styled-components";

const StyledNameWrapper = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    width: 70%;
  }

  @media (max-width: ${`${media.tablets}`}) {
    width: 100%;
  }
`;

const StyledOccWrapper = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    width: 70%;
  }

  @media (max-width: ${`${media.tablets}`}) {
    width: 100%;
  }
`;

const StyledRectButton = styled(RectButton)`
  margin: 0 10px 10px 0;
  padding: 7px 14px;
  background: transparent;
  color: ${colors.commonColorRectBtnText};
  cursor: pointer;

  &:focus {
    border: 2px solid ${colors.commonOutlignColor};
  }

  &:hover {
    background: linear-gradient(
      to right,
      ${colors.commonColorAddBtnFirst},
      ${colors.commonColorAddBtnSecond}
    );
    color: ${colors.commonColorRectBtnTextHover};
    & > * {
      fill: ${colors.commonColorRectBtnTextHover};
      stroke: ${colors.commonColorRectBtnTextHover};
    }
  }

  @media (max-width: ${`${media.tablets}`}) {
    margin-right: 0;
    margin-bottom: 25px;
  }
`;

const WrapperBtns = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    justify-content: center;
  }
`;

class RevsRedactionCardDescription extends Component {
  clickCloseHandler = e => {
    const { revsCloseRedactionCardAction } = this.props;
    revsCloseRedactionCardAction();
  };

  validateFields = values => {
    return values ? undefined : "Необходимо заполнить";
  };

  render() {
    const {
      initialState: { initialValues }
    } = this.props;

    return (
      <>
        <StyledNameWrapper customWidth="45%">
          <SimpleCustomField
            validate={this.validateFields}
            id="revname"
            name="revname"
            placeholder="Пример имени автора"
            title="Имя автора"
            type="text"
            area={false}
          />
        </StyledNameWrapper>
        <StyledOccWrapper customWidth="45%">
          <SimpleCustomField
            validate={this.validateFields}
            id="revocc"
            name="revocc"
            placeholder="Пример рода деятельности автора"
            title="Род деятельности"
            type="text"
            area={false}
          />
        </StyledOccWrapper>
        <FlexContainer customWidth="100%">
          <SimpleCustomField
            validate={this.validateFields}
            id="revtext"
            name="revtext"
            placeholder="Пример отзыва автора"
            title="Отзыв"
            type="text"
            area={true}
          />
        </FlexContainer>
        <WrapperBtns
          customWidth="100%"
          alignItems="center"
          justifyContent="flex-end"
        >
          <StyledRectButton onClick={this.clickCloseHandler}>
            Отмена
          </StyledRectButton>
          <StyledRectButton type="submit" margin="0 0 0 15px">
            Сохранить
          </StyledRectButton>
        </WrapperBtns>
      </>
    );
  }
}

const mapStateToProps = state => ({
  initialState: getRevRedactionCardInitState(state)
});

const mapDispatchToProps = {
  revsCloseRedactionCardAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevsRedactionCardDescription);
