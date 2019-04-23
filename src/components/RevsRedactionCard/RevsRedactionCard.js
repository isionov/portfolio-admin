import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import Title from "../Title";
import FormCustom from "../FormCustom";
import { colors, media } from "../../modules/params.js";
import RevsImageLoader from "../RevsImageLoader";
import { Form, Field } from "react-final-form";
import RevsRedactionCardDescription from "../RevsRedactionCardDescription";
import { getRevRedactionCardInitState } from "../../modules/Revs";
import {
  revsPostNewRevAction,
  revsChangeRevAction,
  revsErrorLoadImageAction
} from "../../modules/Revs";
import { connect } from "react-redux";
import styled from "styled-components";

const FlexContainerWrapper = styled(FlexContainer)`
  padding: 0 30px;
  min-height: 400px;
  background: ${colors.commonBgCardColor};
  margin: 0 0 30px 2%;
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    flex-basis: unset;
    margin: 0 0 30px 0;
  }
`;

const StyledTitle = styled(Title)`
  border-bottom: ${`2px solid ${colors.commonDarkColor}`};
  width: 100%;
  padding: 15px;
`;

const FlexFormWrapper = styled(FlexContainer)`
  padding: 40px 0 0 0;
`;

const StyledFormCustom = styled(FormCustom)`
  @media (max-width: ${`${media.tablets}`}) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
  }
`;

const WrapperImgLoader = styled(FlexContainer)`
  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
  }
`;

const WrapperCardDesc = styled(FlexContainer)`
  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
  }
`;

class RevsRedactionCard extends Component {
  handleSubmit = (...values) => {
    const { revname, revocc, revtext } = values[0];
    const {
      initialState: { currentImg, currentId },
      revsPostNewRevAction,
      revsChangeRevAction,
      revsErrorLoadImageAction
    } = this.props;
    const formData = new FormData();

    formData.append("author", revname);
    formData.append("text", revtext);
    if (currentImg) {
      formData.append("photo", currentImg);
    }
    formData.append("occ", revocc);

    const data = { formData, currentId };

    if (!currentId && currentImg) {
      revsPostNewRevAction(data);
    } else if (!currentId && !currentImg) {
      revsErrorLoadImageAction(true);
    } else {
      revsChangeRevAction(data);
    }
  };

  myRender = ({ handleSubmit, submitting, values, currentImg }) => (
    <StyledFormCustom
      onSubmit={handleSubmit}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <WrapperImgLoader customWidth="30%">
        <RevsImageLoader currentImg={currentImg} />
      </WrapperImgLoader>
      <WrapperCardDesc
        customWidth="65%"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <RevsRedactionCardDescription />
      </WrapperCardDesc>
    </StyledFormCustom>
  );

  render() {
    const {
      initialState: { initialValues, currentImg }
    } = this.props;

    return (
      <FlexContainerWrapper
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
        <FlexFormWrapper
          customWidth="100%"
          justifyContent="space-between"
          alignItems="flex-start"
          padding="40px 0 0 0"
        >
          <Form
            onSubmit={this.handleSubmit}
            render={this.myRender}
            initialValues={initialValues}
            currentImg={currentImg}
          />
        </FlexFormWrapper>
      </FlexContainerWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  initialState: getRevRedactionCardInitState(state)
});

const mapDispatchToProps = {
  revsPostNewRevAction,
  revsChangeRevAction,
  revsErrorLoadImageAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RevsRedactionCard);
