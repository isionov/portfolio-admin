import React from "react";
import styled from "styled-components";

const FormCustom = styled.form`
  width: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => `${justifyContent || "center"}`};
  flex-direction: ${({ flexDirection }) => `${flexDirection || "column"}`};
  align-items: ${({ alignItems }) => `${alignItems || "center"}`};
  padding: ${({ padding }) => `${padding || ""}`};
  margin: ${({ margin }) => `${margin || ""}`};
  height: ${({ height }) => `${height || ""}`};
`;

export default FormCustom;
