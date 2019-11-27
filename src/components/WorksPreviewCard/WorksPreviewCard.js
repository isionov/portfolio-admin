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
import {
  worksRedactCardAction,
  worksDeleteWorkAction
} from "../../modules/Works";
import { connect } from "react-redux";
import RectButton from "../RectButton";

const FlexContainerWrapper = styled(FlexContainer)`
  width: 30%;
  min-height: 555px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 30px 2%;
  background: ${colors.commonBgColor};
  padding-bottom: 40px;
  overflow: hidden;
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};

  @media (max-width: ${`${media.tablets}`}) {
    width: 45%;
    margin: 0 0 30px 2.5%;
  }

  @media (max-width: ${`${media.phones}`}) {
    min-height: 500px;
    width: 100%;
    margin: 0 0 30px 0;
  }
`;

const FlexContainerImgWrapper = styled(FlexContainer)`
  height: 190px;
  width: 102%;
  margin: 0 0 30px 0;
  overflow: hidden;
  margin-top: -1px;
  position: relative;
`;

const FlexContainerTagsWrapper = styled(FlexContainer)`
  bottom: 5px;
  left: 5px;
  right: 5px;
  flex-wrap: wrap;
  position: absolute;
  justify-content: flex-end;
`;

const StyledRectButton = styled(RectButton)`
  margin: 0 10px 10px 0;
  padding: 4px 8px;
  background: ${colors.commonLightColor};
  color: ${colors.commonMostDarkColor};
  font-size: 12px;
  font-weight: 400;
`;

const StyledTitle = styled(Title)`
  color: ${colors.commonMostDarkColor};
  width: 90%;
  margin: 0 0 30px 0;
  text-align: left;
  font-size: 18px;
  font-weight: 700;
`;

const StyledTextCustom = styled(TextCustom)`
  margin: 0 0 30px 0;
  text-align: left;
  font-size: 16px;
  max-height: 150px;
`;

const FlexContainerBtn = styled(FlexContainer)`
  justify-content: space-between;
  width: 90%;
  margin-top: auto;
`;

const StyledButtonIconText = styled(ButtonIconText)`
  stroke: ${({ red }) =>
    red ? colors.commonFillIconDelete : colors.commonFillIconChange};
  fill: ${({ red }) =>
    red ? colors.commonFillIconDelete : colors.commonFillIconChange};
  cursor: pointer;
`;

class WorksPreviewCard extends Component {
  clickRedactHandler = e => {
    const {
      cardState: { id, title, link, description, photo, techs },
      worksRedactCardAction
    } = this.props;

    const data = {
      initialValues: {
        workname: title,
        worklink: link,
        workdesc: description,
        oldworktags: techs,
        worktags: ""
      },
      currentImg: `{data:image/png;base64, ${photo}`,
      // currentImg: `http://iliaion-dev.ru/${photo}`,
      // currentImg: `https://webdev-api.loftschool.com/${photo}`,
      currentId: id
    };

    worksRedactCardAction(data);
  };

  clickDeleteHandler = e => {
    const {
      cardState: { id },
      worksDeleteWorkAction
    } = this.props;

    const data = {
      currentId: id
    };

    worksDeleteWorkAction(data);
  };

  render() {
    const { title, link, description, photo, techs } = this.props.cardState;
    let tags = techs.split(" ");
    console.log("render", photo);
    return (
      <FlexContainerWrapper>
        <FlexContainerImgWrapper>
          <ImageCustom src={`data:image/png;base64, ${photo}`} />
          <FlexContainerTagsWrapper>
            {tags.map(tag => {
              if (tag)
                return <StyledRectButton key={tag}>{tag}</StyledRectButton>;
            })}
          </FlexContainerTagsWrapper>
        </FlexContainerImgWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledTextCustom>{description}</StyledTextCustom>
        <LinkCustom width="90%" margin="0 0 30px 0" href={link}>
          {link}
        </LinkCustom>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  worksRedactCardAction,
  worksDeleteWorkAction
};

export default connect(mapStateToProps, mapDispatchToProps)(WorksPreviewCard);
