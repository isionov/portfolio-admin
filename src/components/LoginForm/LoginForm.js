import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import { Redirect } from "react-router-dom";
import { Form } from "react-final-form";
import Title from "../Title";
import FormCustom from "../FormCustom";
import FieldCustom from "../FieldCustom";
import Button from "../Button";
import iconLogin from "../../images/icons/User.svg";
import iconPass from "../../images/icons/Key.svg";
import { colors, media } from "../../modules/params.js";
import { connect } from "react-redux";
import { getLoggedStatus } from "../../modules/Auth";
import { handleLoginSubmit } from "../../modules/Auth";
import styled from "styled-components";

const StyledFlexWrapper = styled(FlexContainer)`
  min-height: 300px;
  background: ${colors.colorBg};
  position: relative;
  padding: 60px 75px;
  box-shadow: ${`5px 5px 20px ${colors.commonColorShadow}`};

  @media (max-width: ${`${media.tablets}`}) {
    width: 400px;
  }

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
  }
`;

const StyledFlexWrapperField = styled(FlexContainer)`
  margin: 0 0 35px 0;
`;

const StyleSubmitdButton = styled(Button)`
  padding: 25px 120px;
  border-radius: 35px 10px;
  color: ${`${colors.colorText}`};
`;

const presetsLogin = {
  name: "login",
  placeholder: "Ваш логин",
  title: "Логин",
  id: "login",
  iconItem: iconLogin,
  inputCustom: { type: "text" },
  strokeWidth: "15px"
};

const presetsPass = {
  name: "password",
  placeholder: "Ваш пароль",
  title: "Пароль",
  id: "password",
  iconItem: iconPass,
  inputCustom: { type: "password" },
  strokeWidth: "2px"
};

const validationRequired = values => {
  return values ? undefined : "Необходимо заполнить поле";
};

class LoginForm extends Component {
  handlerSubmitting = values => {
    const { handleLoginSubmit } = this.props;
    handleLoginSubmit(values);
  };

  render() {
    const { loggedIn } = this.props;

    return (
      <>
        <Form
          onSubmit={this.handlerSubmitting}
          initialValues={{ login: "", password: "" }}
        >
          {({ handleSubmit, submitting, values }) => (
            <StyledFlexWrapper customWidth={"560px"} flexDirection={"column"}>
              <Title
                color={colors.commonMostDarkColor}
                margin={"0 0 35px 0"}
                as="h2"
                fontSize={`36px`}
              >
                Авторизация
              </Title>
              <FormCustom onSubmit={handleSubmit}>
                <StyledFlexWrapperField customWidth="100%">
                  <FieldCustom
                    freez={false}
                    validate={validationRequired}
                    id="login"
                    name="login"
                    placeholder="Ваш логин"
                    presets={presetsLogin}
                  />
                </StyledFlexWrapperField>
                <StyledFlexWrapperField customWidth="100%">
                  <FieldCustom
                    freez={false}
                    validate={validationRequired}
                    id="password"
                    name="password"
                    placeholder="Ваш пароль"
                    presets={presetsPass}
                  />
                </StyledFlexWrapperField>

                <StyleSubmitdButton
                  disabled={submitting}
                  type="submit"
                  backType={`grad`}
                >
                  Отправить
                </StyleSubmitdButton>
              </FormCustom>
            </StyledFlexWrapper>
          )}
        </Form>
        {loggedIn ? <Redirect to="/content" /> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedStatus(state)
  };
};

const mapDispatchToProps = { handleLoginSubmit };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
