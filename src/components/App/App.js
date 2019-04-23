import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";
import PrivateRoute from "../PrivateRoute";
import withLocalStorageHoc from "../LocalStorageHoc";
import MainContent from "../MainContent";
import LoginForm from "../LoginForm";
import FlexContainer from "../FlexContainer";
import bg from "../../images/content/adminBg.png";
import { loginSuccess, loginReset } from "../../modules/Auth";
import { connect } from "react-redux";
import instanceAxios from "../../modules/initApi.js";

const StyledFlexContainer = styled(FlexContainer)`
  position: relative;
  opacity: 1;
`;

const StyledFlexContainerBgWrapper = styled(FlexContainer)`
  background: url(${bg}) center center / cover no-repeat;
  opacity: 0.5;
  z-index: -1;
  position: absolute;
`;

class App extends Component {
  componentDidMount() {
    const { loginSuccess, loginReset } = this.props;
    const token = localStorage.getItem("tkn");
    const id = localStorage.getItem("id");

    if (token && id) {
      instanceAxios.defaults.headers["Authorization"] = "Bearer " + token;
      loginSuccess({ success: true, id });
    } else {
      loginReset();
    }
  }

  render() {
    return (
      <StyledFlexContainer
        flexBasis="100%"
        customHeight="100vh"
        flexDirection="column"
      >
        <StyledFlexContainerBgWrapper customWidth="100%" customHeight="100%" />
        <Switch>
          <Route path="/login" render={props => <LoginForm {...props} />} />
          <PrivateRoute path="/content" component={MainContent} />
          <Redirect to="/login" />
        </Switch>
      </StyledFlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = { loginSuccess, loginReset };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
