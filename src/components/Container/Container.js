import React from "react";
import styled from "styled-components";
import { rem } from "../../modules/helper";
import { media } from "../../modules/params.js";

const Container = styled.div`
  max-width: ${rem(1100)};
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
`;

export default Container;
