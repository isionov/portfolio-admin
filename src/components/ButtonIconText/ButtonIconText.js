import React, { Component } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { colors } from "../../modules/params.js";

const StyledIcon = styled(Icon)`
  margin: 0 0 0 10px;
  width: 17px;
  height: 17px;
`;

const UnstyledButtonIconText = props => {
  const {
    iconItem,
    className,
    children,
    fillColor,
    strokeColor,
    clickHandler
  } = props;

  return (
    <button type="button" className={className} onClick={clickHandler}>
      {children}
      <StyledIcon iconItem={iconItem} fill={fillColor} stroke={strokeColor} />
    </button>
  );
};

export default styled(UnstyledButtonIconText)`
  align-items: center;
  padding: 0;
  margin: 0;
  background: transparent;
  position: relative;
  display: inline-flex;
  border: 0;
`;
