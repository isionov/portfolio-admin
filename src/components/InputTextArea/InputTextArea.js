import React from "react";
import styled from "styled-components";
import { colors } from "../../modules/params.js";

const InputTextArea = styled.textarea`
  background: transparent;
  margin: 15px 0 0 0;
  border: 0;
  padding: 15px;
  color: ${`${colors.commonMostDarkColor}`};
  border: ${`1px solid ${colors.commonDarkColor}`};
  width: 100%;
  cursor: text;
  outline: none;

  &::placeholder {
    color: ${`${colors.commonDarkColor}`};
  }
`;

export default InputTextArea;
