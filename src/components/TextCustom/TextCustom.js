import React, { Component } from "react";
import { colors } from "../../modules/params";
import styled from "styled-components";

const TextCustom = styled.div`
  display: ${({ display }) => display || "inline-block"};
  margin: 0;
  overflow: hidden;
  width: 90%;
  padding: 0;
  color: ${colors.commonDarkColor};
  font-weight: 400;
  ${({ other }) => other || ""}
`;

export default TextCustom;
