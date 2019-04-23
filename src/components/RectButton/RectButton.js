import React, { Component } from "react";
import { colors } from "../../modules/params.js";
import styled from "styled-components";

const RectButton = styled.button`
  border: 2px solid transparent;
  margin: ${({ margin }) => `${margin || ""}`};
  padding: ${({ padding }) => `${padding || " 12px 25px"}`};
  display: inline-flex;
  outline: none;
  border-radius: 20% / 50%;
  background: ${({ background }) => `${background || `transparent`}`};
  color: ${({ color }) => `${color || ` ${colors.colorRectBtnText}`}`};
  ${({ other }) => `${other || ""}`}
`;

export default RectButton;
