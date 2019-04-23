import React, { Component } from "react";
import { colors } from "../../modules/params.js";
import styled from "styled-components";

const LinkCustom = styled.a`
  color: ${({ color }) => `${color || `${colors.commonLinkColor}`}`};
  width: ${({ width }) => `${width || ``}`};
  margin: ${({ margin }) => `${margin || ``}`};
  align-self: ${({ alignSelf }) => `${alignSelf || `center`}`};
  display: inline-block;
  text-decoration: none;
`;

export default LinkCustom;
