import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import { Field } from "react-final-form";
import TextCustom from "../TextCustom";
import Input from "../Input";
import InputTextArea from "../InputTextArea";
import { colors, media } from "../../modules/params";
import styled from "styled-components";

const StyledTextCustomTitle = styled(TextCustom)`
  color: ${colors.commonDarkColor};
`;

const StyledFlexContainer = styled(FlexContainer)`
  width: 100%;
  justify-content: flex-start;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 0 25px 0;
  border-bottom: ${({ area }) =>
    area ? "" : `2px solid ${colors.commonMostDarkColor}`};

  @media (max-width: ${`${media.phones}`}) {
    border-width: 1px;
  }
`;

const styleError = (other, flag) => {
  return flag
    ? (other += "visibility:visible;")
    : (other += "visibility:hidden;");
};

let errorPreset = `bottom:-20px; left:0; position:absolute; color: ${
  colors.errorColor
}; `;

const SimpleCustomField = props => {
  const { freez, validate, id, name, placeholder, title, type, area } = props;

  const myRender = ({ input: { value, ...rest }, meta, placeholder }) => {
    return (
      <StyledFlexContainer area={area}>
        <StyledTextCustomTitle htmlFor={id} as="label">
          {title}
        </StyledTextCustomTitle>
        {area ? (
          <InputTextArea
            rows={4}
            type={type}
            id={id}
            value={value}
            {...rest}
            placeholder={placeholder}
          />
        ) : (
          <Input
            type={type}
            id={id}
            value={value}
            {...rest}
            placeholder={placeholder}
          />
        )}

        <TextCustom
          as="span"
          other={styleError(errorPreset, meta.error && meta.touched)}
        >
          {meta.error}
        </TextCustom>
      </StyledFlexContainer>
    );
  };

  return (
    <Field
      validate={validate}
      id={id}
      name={name}
      placeholder={placeholder}
      render={myRender}
    />
  );
};

export default SimpleCustomField;
