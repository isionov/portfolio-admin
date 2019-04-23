import React from "react";
import styled from "styled-components";
import cross from "../../images/icons/cross.svg";
import { colors } from "../../modules/params.js";

const backgrountType = {
  svg: `transparent`,
  grad: `linear-gradient(
    to right,
    ${colors.commonAuthButtonGradientStart},
    ${colors.commonAuthButtonGradientEnd}
  )`
};

const Button = styled.button`
  font-size: 16px;
  font-weight: 700;
  background: ${({ backType }) =>
    `${(backType && backgrountType[backType]) || "transparent"}`};
  border: 2px solid transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: ${colors.commonOutlignColor};
  }
`;

export default Button;
