import React, { Component } from "react";
import { colors, media } from "../../modules/params";
import FlexContainer from "../FlexContainer";
import Title from "../Title";
import RoundAddButton from "../RoundAddButton";
import add from "../../images/icons/Add.svg";
import Button from "../Button";
import TextCustom from "../TextCustom";
import { skillOpenNewCardAction } from "../../modules/Skills";
import { getNewCardOpenStatus } from "../../modules/Skills";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledTextCustom = styled(TextCustom)`
  color: ${colors.colorLinkHover};
  width: 150px;
  font-size: 18px;
  font-weight: 400;

  @media (max-width: ${`${media.phones}`}) {
    font-size: 17px;
  }

  @media (max-width: ${`${media.phones}`}) {
    font-size: 16px;
  }
`;

const StyledFlexContainer = styled(FlexContainer)`
  padding: 50px 0 50px 2%;

  @media (max-width: ${`${media.phones}`}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 35px 0 0 5%;
  }
`;

const StyledTitle = styled(Title)`
  @media (max-width: ${`${media.phones}`}) {
    margin-bottom: 35px;
  }
`;

const StyledBtnWrapper = styled(FlexContainer)`
  @media (max-width: ${`${media.phones}`}) {
    margin-bottom: 35px;
    justify-content: flex-start;
  }
`;

const StyledRoundAddButton = styled(RoundAddButton)`
  @media (max-width: ${`${media.phones}`}) {
    margin-left: 0;
  }
`;

class SectionHeader extends Component {
  render() {
    const {
      title,
      showButton,
      skillOpenNewCardAction,
      fontWeight
    } = this.props;

    const handlerOpneNewCard = e => {
      skillOpenNewCardAction();
    };

    return (
      <StyledFlexContainer>
        <StyledTitle
          fontWeight={fontWeight}
          as="h3"
          color={`${colors.colorMostDarkText}`}
        >{`Блок "${title}"`}</StyledTitle>
        {showButton ? (
          <StyledBtnWrapper>
            <StyledRoundAddButton
              handlerOnClick={handlerOpneNewCard}
              width={`20px`}
              height={`20px`}
              iconItem={add}
              margin={`0 0 0 50px`}
            />
            <Button margin={`0 0 0 15px`} onClick={handlerOpneNewCard}>
              <StyledTextCustom>Добавить группу</StyledTextCustom>
            </Button>
          </StyledBtnWrapper>
        ) : null}
      </StyledFlexContainer>
    );
  }
}

const mapStateToProps = state => ({
  isOpened: getNewCardOpenStatus(state)
});

const mapDispatchToProps = { skillOpenNewCardAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionHeader);
