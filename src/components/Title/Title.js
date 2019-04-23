import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  display: inline-block;
  margin: ${({ margin }) => margin || "0"};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "400"};
  color: ${({ color }) => color || "rgba(255,255,255,0.5)"};
`;

export default Title;
