import React, { Component } from "react";
import { colors, media } from "../../modules/params.js";
import SimpleCustomField from "../SimpleCustomField";
import FlexContainer from "../FlexContainer";
import RectButton from "../RectButton";
import Icon from "../Icon";
import cross from "../../images/icons/Cross.svg";
import { connect } from "react-redux";
import {
  worksCloseRedactionCardAction,
  worksDeleteTagAction
} from "../../modules/Works";
import { getWorksRedactionCardInitState } from "../../modules/Works";
import styled, { css } from "styled-components";

const FlexContainerTagsWrapper = styled(FlexContainer)`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 0 40px 0;
  flex-wrap: wrap;
`;

const FlexContainerButtonsWrapper = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    justify-content: center;
  }
`;

const StyledIcon = styled(Icon)`
  width: 12px;
  height: 12px;
  margin: auto 0 auto 6px;
  fill: ${colors.commonMostDarkColor};
  stroke: ${colors.commonMostDarkColor};
`;

const StyledRectButton = styled(RectButton)`
  margin: 0 10px 10px 0;
  padding: 7px 14px;
  background: ${colors.commonLightColor};
  color: ${colors.commonMostDarkColor};
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
    background: transparent;
    color: ${`${colors.commonLinkColor}`};
  }
`;

class WorksRedactionCardDescription extends Component {
  clickDeleteTagHandler = (e) => {
    const { worksDeleteTagAction } = this.props;
    let eventPath = e.nativeEvent.path;
    let btn = false;
    let elem = null;
    eventPath.forEach(function(value) {
      if (value.type === "button") {
        btn = true;
        elem = value;
      }
    });
    if (btn && elem.textContent) {
      worksDeleteTagAction(elem.textContent);
    }
  };

  clickCloseHandler = (e) => {
    const { worksCloseRedactionCardAction } = this.props;
    worksCloseRedactionCardAction();
  };

  validateFields = (values) => {
    return values ? undefined : "Необходимо заполнить";
  };

  validateFieldsTags = (values) => {
    const {
      initialState: {
        initialValues: { oldworktags }
      }
    } = this.props;

    return values || oldworktags ? undefined : "Необходимо заполнить";
  };

  render() {
    const {
      initialState: { initialValues }
    } = this.props;
    let tags = initialValues.oldworktags.split(" ");

    return (
      <>
        <SimpleCustomField
          validate={this.validateFields}
          id={"workname"}
          name={"workname"}
          placeholder=""
          title="Название"
          type="text"
          area={false}
        />
        <SimpleCustomField
          validate={this.validateFields}
          id={"worklink"}
          name={"worklink"}
          placeholder=""
          title="Ссылка"
          type="text"
          area={false}
        />
        <SimpleCustomField
          validate={this.validateFields}
          id={"workdesc"}
          name={"workdesc"}
          placeholder=""
          title="Описание"
          type="text"
          area={true}
        />
        <SimpleCustomField
          validate={this.validateFieldsTags}
          id={"worktags"}
          name={"worktags"}
          placeholder=""
          title="Добавление тэга"
          type="text"
          area={false}
        />
        <FlexContainerTagsWrapper>
          {tags.map((tag) => {
            if (tag)
              return (
                <StyledRectButton
                  key={tag}
                  onClick={this.clickDeleteTagHandler}
                  type="button"
                >
                  {tag}
                  {<StyledIcon iconItem={cross} />}
                </StyledRectButton>
              );
          })}
        </FlexContainerTagsWrapper>
        <FlexContainerButtonsWrapper
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
        </FlexContainerButtonsWrapper>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  initialState: getWorksRedactionCardInitState(state)
});

const mapDispatchToProps = {
  worksCloseRedactionCardAction,
  worksDeleteTagAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorksRedactionCardDescription);
