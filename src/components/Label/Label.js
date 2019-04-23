import React, { Component } from "react";
import { colors } from "../../modules/params";
import styled from "styled-components";

const Label = styled.label`
  padding: 0;
  display: inline-block;
  margin: ${({ margin }) => `${margin || "0"}`};
  border: ${({ margin }) => `${margin || "0"}`};
  font-size: ${({ fontSize }) => `${fontSize || ""}`};
  font-weight: ${({ fontWeight }) => `${fontWeight || "normal"}`};
  color: ${({ color }) => `${color || `${colors.colorText}`}`};
  ${({ other }) => `${other || ""}`}
`;

export default Label;
