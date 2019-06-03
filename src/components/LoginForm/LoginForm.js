import React, { Component } from "react";
import FlexContainer from "../FlexContainer";
import { Redirect } from "react-router-dom";
import { Form, FormSpy } from "react-final-form";
import Title from "../Title";
import FormCustom from "../FormCustom";
import FieldCustom from "../FieldCustom";
import Button from "../Button";
import iconLogin from "../../images/icons/User.svg";
import iconPass from "../../images/icons/Key.svg";
import { colors, media } from "../../modules/params.js";
import { connect } from "react-redux";
import { getLoggedStatus, getErrorStatus } from "../../modules/Auth";
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

const customMutator = (args, state, tools) => {};

class LoginForm extends Component {
  state = { error: false, count: 0 };

  validationRequired = values => {
    const { loggedIn, errMessage } = this.props;
    let result = undefined;

    if (!values) {
      result = "Необходимо заполнить поле";
    } else if (!loggedIn && this.state.count === 1) {
      result = errMessage;
      return result;
    } else if (!loggedIn && this.state.count > 1) {
      result = undefined;
      this.setState({ ...this.state, count: 0 });
      return result;
    } else {
      result = undefined;
    }

    return result;
  };

  handlerSubmitting = values => {
    const { handleLoginSubmit } = this.props;
    handleLoginSubmit(values);
  };

  onClick = () => {
    this.setState({ ...this.state, count: this.state.count + 1 });
  };
  render() {
    const { loggedIn } = this.props;

    return (
      <>
        <Form
          mutators={{ customMutator }}
          onSubmit={this.handlerSubmitting}
          initialValues={{ login: "", password: "" }}
        >
          {({ handleSubmit, submitting, ...other }) => {
            // плохой код - мутатор ничего не делает, но перезапускает что-то внутри.
            // Поля обновляются и только тогда появляется ошибка. Как перезапустить валидацию
            // полей после изменения redux store?
            other.form.mutators.customMutator("");

            return (
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
                      validate={this.validationRequired}
                      id="login"
                      name="login"
                      placeholder="Ваш логин"
                      presets={presetsLogin}
                    />
                  </StyledFlexWrapperField>
                  <StyledFlexWrapperField customWidth="100%">
                    <FieldCustom
                      freez={false}
                      validate={this.validationRequired}
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
                    onClick={this.onClick}
                  >
                    Отправить
                  </StyleSubmitdButton>
                </FormCustom>
              </StyledFlexWrapper>
            );
          }}
        </Form>
        {loggedIn ? <Redirect to="/content" /> : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedStatus(state),
    errMessage: getErrorStatus(state)
  };
};

const mapDispatchToProps = { handleLoginSubmit };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
