import React from "react";
import styled, { css } from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  width: ${({ customWidth }) => customWidth || ""};
  height: ${({ customHeight }) => customHeight || ""};
  flex-wrap: ${({ flexWrap }) => flexWrap || ``};
  flex-grow: ${({ flexGrow }) => flexGrow || ""};
  flex-shrink: ${({ flexShrink }) => flexShrink || ""};
  flex-basis: ${({ flexBasis }) => flexBasis || ""};
  flex-direction: ${({ flexDirection }) => flexDirection || ""};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  align-self: ${({ alignSelf }) => alignSelf || ""};
  align-content: ${({ alignContent }) => alignContent || ""};

  background: transparent;
`;

export default FlexContainer;
