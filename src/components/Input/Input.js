import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../modules/params.js";

const getHoveredStyles = () => css`
  border-bottom: 1px solid ${colors.commonMostDarkColor};
`;
const Input = styled.input`
  font-weight: 400;
  background: transparent;
  border: 0;
  padding: 15px 0;
  color: ${`${colors.commonMostDarkColor}`};
  border-bottom: 1px solid transparent;
  width: 100%;
  cursor: text;
  outline: none;

  &::placeholder {
    color: ${`${colors.commonDarkColor}`};
  }
  ${({ hovered }) => (hovered ? getHoveredStyles() : "")}

  &:hover {
    ${({ dunamicHovered }) => (dunamicHovered ? getHoveredStyles() : "")}
  }
`;

export default Input;
