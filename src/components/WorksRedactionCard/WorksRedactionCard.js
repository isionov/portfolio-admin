import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import Title from "../Title";
import FormCustom from "../FormCustom";
import { colors, media } from "../../modules/params.js";
import WorksImageLoader from "../WorksImageLoader";
import { Form, Field } from "react-final-form";
import WorksRedactionCardDescription from "../WorksRedactionCardDescription";
import {
  getWorksRedactionCardInitState,
  getOldTags
} from "../../modules/Works";
import {
  worksPostNewWorkAction,
  worksErrorLoadImageAction,
  worksChangeWorkAction
} from "../../modules/Works";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledFlexContainer = styled(FlexContainer)`
  padding: 0 30px;
  min-height: 775px;
  background: ${`${colors.commonBgCardColor}`};
  margin: 0 0 30px 2%;
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    flex-basis: unset;
    margin: 0 0 15px 0;
  }
`;

const StyledFlexContainerForm = styled(FlexContainer)`
  padding: 40px 0 0 0;
`;

const StyledWrapperImgLoader = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    width: 90%;
    margin-bottom: 75px;
  }

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    margin-bottom: 75px;
  }
`;

const StyledWrapperDesc = styled(FlexContainer)`
  @media (max-width: ${`${media.tablets}`}) {
    width: 90%;
    margin-bottom: 25px;
  }

  @media (max-width: ${`${media.tablets}`}) {
    width: 100%;
  }
`;

const StyledFormCustom = styled(FormCustom)`
  @media (max-width: ${`${media.tablets}`}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledTitle = styled(Title)`
  border-bottom: ${`2px solid ${colors.commonDarkColor}`};
  width: 100%;
  padding: 15px;

  @media (max-width: ${`${media.tablets}`}) {
    font-size: 17px;
  }

  @media (max-width: ${`${media.tablets}`}) {
    font-size: 16px;
    border-width: 1px;
  }
`;

class WorksRedactionCard extends Component {
  handleSubmit = (...values) => {
    const { workname, workdesc, worklink, worktags } = values[0];
    const {
      initialState: { currentImg, currentId },
      worksPostNewWorkAction,
      worksChangeWorkAction,
      worksErrorLoadImageAction,
      oldTags
    } = this.props;
    const newTags = (
      (oldTags ? oldTags : "") +
      " " +
      (worktags ? worktags : "")
    ).trim();

    const formData = new FormData();
    formData.append("title", workname);
    formData.append("techs", newTags);
    formData.append("photo", currentImg);
    formData.append("link", worklink);
    formData.append("description", workdesc);
    const data = { formData, currentId };

    if (!currentId && currentImg) {
      worksPostNewWorkAction(data);
    } else if (!currentId && !currentImg) {
      worksErrorLoadImageAction(true);
    } else if (currentId) {
      worksChangeWorkAction(data);
    }
  };

  myRender = ({ handleSubmit, currentImg }) => (
    <StyledFormCustom
      onSubmit={handleSubmit}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <StyledWrapperImgLoader customWidth="45%">
        <WorksImageLoader currentImg={currentImg} />
      </StyledWrapperImgLoader>
      <StyledWrapperDesc customWidth="45%" flexDirection="column">
        <WorksRedactionCardDescription />
      </StyledWrapperDesc>
    </StyledFormCustom>
  );

  render() {
    const {
      initialState: { initialValues, currentImg }
    } = this.props;

    return (
      <StyledFlexContainer
        flexBasis="94%"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <StyledTitle
          fontSize="18px"
          fontWeight="700"
          color={`${colors.colorMostDarkText}`}
          as="h4"
        >
          Редактирование работы
        </StyledTitle>
        <StyledFlexContainerForm
          flexGrow="1"
          customWidth="100%"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Form
            onSubmit={this.handleSubmit}
            render={this.myRender}
            initialValues={initialValues}
            currentImg={currentImg}
          />
        </StyledFlexContainerForm>
      </StyledFlexContainer>
    );
  }
}

const mapStateToProps = state => ({
  initialState: getWorksRedactionCardInitState(state),
  oldTags: getOldTags(state)
});

const mapDispatchToProps = {
  worksPostNewWorkAction,
  worksChangeWorkAction,
  worksErrorLoadImageAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorksRedactionCard);
