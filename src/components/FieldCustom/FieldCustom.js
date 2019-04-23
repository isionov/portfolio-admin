import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import { Field } from "react-final-form";
import Label from "../Label";
import Input from "../Input";
import Icon from "../Icon";
import styled from "styled-components";
import { colors } from "../../modules/params";
import TextCustom from "../TextCustom";

const StyledTextCustom = styled(TextCustom)`
  width: 150px;
`;

const StyledFlexContainer = styled(FlexContainer)`
  border-bottom: ${({ simple }) =>
    simple ? null : `1px solid ${colors.colorDarkText}`};
  position: relative;
`;

const StyledFlexWrapperIcon = styled(FlexContainer)`
  display: ${({ simple }) => (simple ? "none" : null)};
  margin: auto 0 15px 0;
`;

const StyledFlexWrapperInput = styled(FlexContainer)`
  margin: 0 0 0 10px;
`;

const styleError = (other, flag) => {
  return flag
    ? (other += "visibility:visible;")
    : (other += "visibility:hidden;");
};

let errorPreset = `bottom:-20px; left:0; position:absolute; color: ${
  colors.errorColor
}; `;

const FieldCustom = props => {
  const {
    freez,
    validate,
    id,
    name,
    placeholder,
    hovered,
    dunamicHovered,
    presets: {
      preserveAspectRatio,
      iconItem,
      title,
      inputCustom: { type },
      simple,
      strokeWidth
    }
  } = props;

  return (
    <Field id={id} name={name} placeholder={placeholder}>
      {({ input, meta, placeholder, ...other }) => (
        <StyledFlexContainer
          customWidth="100%"
          simple={simple}
          justifyContent="flex-start"
        >
          <StyledFlexWrapperIcon
            customWidth="20px"
            customHeight="20px"
            simple={simple}
          >
            <Icon
              fill="transparent"
              stroke={colors.colorDefaultIcon}
              iconItem={iconItem}
              strokeWidth={strokeWidth}
              preserveAspectRatio={preserveAspectRatio}
            />
          </StyledFlexWrapperIcon>
          <StyledFlexWrapperInput
            flexDirection="column"
            alignItems="flex-start"
            customWidth="100%"
          >
            <Label
              htmlFor={id}
              margin={simple ? null : "0 0 10px 0"}
              color={colors.colorDarkText}
              other={simple ? "display:none;" : null}
            >
              {title}
            </Label>
            <Input
              dunamicHovered={dunamicHovered}
              disabled={freez}
              type={type}
              id={id}
              hovered={hovered}
              {...input}
              {...other}
              placeholder={placeholder}
            />
          </StyledFlexWrapperInput>
          <StyledTextCustom
            dispaly={simple ? "none;" : null}
            as="span"
            other={styleError(
              errorPreset,
              meta.error && meta.touched && meta.submitFailed
            )}
          >
            {!freez && meta.error}
          </StyledTextCustom>
        </StyledFlexContainer>
      )}
    </Field>
  );
};

export default FieldCustom;
