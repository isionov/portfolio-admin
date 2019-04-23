import React from "react";
import user from "../../images/content/Me.png";
import OwnerImage from "../OwnerImg";
import WrapperOwnerImage from "../WrapperOwnerImage";
import FlexContainer from "../FlexContainer";
import Title from "../Title";
import { colors, media } from "../../modules/params.js";
import styled from "styled-components";

const StyledTitle = styled(Title)`
  font-size: 18px;
  color: ${`${colors.commonHeaderTitleText}`};
`;

const Owner = props => {
  return (
    <FlexContainer>
      <WrapperOwnerImage>
        <OwnerImage src={user} />
      </WrapperOwnerImage>
      <StyledTitle margin={"0 0 0 20px"}>Илья Ионов</StyledTitle>
    </FlexContainer>
  );
};

export default Owner;
