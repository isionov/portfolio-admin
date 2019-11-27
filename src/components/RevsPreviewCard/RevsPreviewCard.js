import React, { Component } from "react";
import { colors, media } from "../../modules/params.js";
import FlexContainer from "../FlexContainer";
import ImageCustom from "../ImageCustom";
import Title from "../Title";
import TextCustom from "../TextCustom";
import LinkCustom from "../LinkCustom";
import ButtonIconText from "../ButtonIconText";
import pencil from "../../images/icons/Pencil.svg";
import cross from "../../images/icons/Cross.svg";
import styled from "styled-components";
import { revsRedactCardAction, revsDeleteRevAction } from "../../modules/Revs";
import { connect } from "react-redux";
import RectButton from "../RectButton";

const FlexContainerWrapper = styled(FlexContainer)`
  width: 30%;
  min-height: 340px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 30px 2%;
  background: ${colors.commonBgColor};
  padding: 0 25px 25px 25px;
  overflow: hidden;
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};

  @media (max-width: ${`${media.tablets}`}) {
    width: 45%;
    margin: 0 0 30px 2.5%;
  }

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    margin: 0 0 30px 0;
  }
`;

const FlexContainerImgWrapper = styled(FlexContainer)`
  overflow: hidden;
  border-radius: 50%;
  margin-top: -1px;
  position: relative;
`;

const StyledImageCustom = styled(ImageCustom)`
  width: unset;
  height: 100%;
  flex-basis: auto;
`;

const StyledAuthorOcc = styled(TextCustom)`
  text-align: left;
  max-height: 130px;
  width: 100%;
`;

const StyledTextCustom = styled(TextCustom)`
  text-align: left;
  max-height: 130px;
  width: 100%;
  overflow: initial;
`;

const StyledTextCustomAuthor = styled(TextCustom)`
  color: ${colors.commonMostDarkColor};
  font-size: 18px;
  font-weight: 700;
`;

const FlexContainerBtn = styled(FlexContainer)`
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
`;

const FlexContainerAuthor = styled(FlexContainer)`
  padding: 25px 0;
  border-bottom: ${`1px solid ${colors.commonDarkColor}`};
  margin-bottom: 25px;
`;

const FlexContainerRightCol = styled(FlexContainer)`
  margin-left: 20px;
`;

const StyledButtonIconText = styled(ButtonIconText)`
  stroke: ${({ red }) =>
    red ? colors.commonFillIconDelete : colors.commonFillIconChange};
  fill: ${({ red }) =>
    red ? colors.commonFillIconDelete : colors.commonFillIconChange};
  cursor: pointer;
`;

class RevsPreviewCard extends Component {
  clickRedactHandler = () => {
    const {
      cardState: { id, author, occ, text, photo },
      revsRedactCardAction
    } = this.props;

    const data = {
      initialValues: {
        revname: author,
        revocc: occ,
        revtext: text
      },
      currentImg: `data:image/png;base64, ${photo}`,
      // currentImg: `http://iliaion-dev.ru/${photo}`,

      currentId: id
    };

    revsRedactCardAction(data);
  };

  clickDeleteHandler = e => {
    const {
      cardState: { id },
      revsDeleteRevAction
    } = this.props;

    const data = {
      currentId: id
    };

    revsDeleteRevAction(data);
  };

  render() {
    const { author, occ, text, photo } = this.props.cardState;

    return (
      <FlexContainerWrapper>
        <FlexContainerAuthor customWidth="100%" justifyContent="flex-start">
          <FlexContainerImgWrapper
            flexShrink="0"
            customWidth="50px"
            customHeight="50px"
          >
            <StyledImageCustom src={`data:image/png;base64, ${photo}`} />
          </FlexContainerImgWrapper>
          <FlexContainerRightCol
            flexBasis="100%"
            flexDirection="column"
            alignItems="flex-start"
          >
            <StyledTextCustomAuthor>{author}</StyledTextCustomAuthor>
            <StyledAuthorOcc>{occ}</StyledAuthorOcc>
          </FlexContainerRightCol>
        </FlexContainerAuthor>
        <StyledTextCustom>{text}</StyledTextCustom>

        <FlexContainerBtn>
          <StyledButtonIconText
            iconItem={pencil}
            clickHandler={this.clickRedactHandler}
          >
            Править
          </StyledButtonIconText>
          <StyledButtonIconText
            red={true}
            iconItem={cross}
            clickHandler={this.clickDeleteHandler}
          >
            Удалить
          </StyledButtonIconText>
        </FlexContainerBtn>
      </FlexContainerWrapper>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  revsRedactCardAction,
  revsDeleteRevAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RevsPreviewCard);
