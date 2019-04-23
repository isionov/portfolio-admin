import React, { Component } from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import { colors } from "../../modules/params.js";

const getButtonStyles = ({ large, width, height, margin }) =>
  large
    ? css`
        width: 150px;
        height: 150px;
        border: 2px solid ${colors.commonColorAddBtnThird};
        padding: ${`${(3 * parseFloat(150)) / 8 + "px" || ""}`};
        margin: 0;
        border-radius: 50%;
        position: relative;
        display: inline-flex;
        background: transparent;
        cursor: pointer;
      `
    : css`
        width: ${`${width || ""}`};
        height: ${`${height || ""}`};
        padding: ${`${parseFloat(width) / 4 + "px" || ""}`};
        margin: ${`${margin || ""}`};
        border-radius: 50%;
        position: relative;
        display: inline-flex;
        background: linear-gradient(
          to right,
          ${colors.commonColorAddBtnFirst},
          ${colors.commonColorAddBtnSecond}
        );
        border: 0;
        cursor: pointer;
      `;

const UnstyledRoundButton = props => {
  const { iconItem, className, type, disabled, handlerOnClick } = props;

  return (
    <button
      onClick={handlerOnClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      <Icon
        iconItem={iconItem}
        fill={colors.commonColorAddBtnThird}
        stroke={colors.commonColorAddBtnThird}
      />
    </button>
  );
};

export default styled(UnstyledRoundButton)`
  flex-shrink: 0;
  ${props => getButtonStyles(props)}
`;
