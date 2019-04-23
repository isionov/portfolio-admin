import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Container from "../Container";
import FlexContainer from "../FlexContainer";
import Owner from "../Owner";
import Title from "../Title";
import { AuthLink } from "../AuthLink";
import { getLoggedStatus, loginReset } from "../../modules/Auth";
import { colors, media } from "../../modules/params.js";

const StyledFlexWrapper = styled(FlexContainer)`
  min-height: 90px;
`;

const StyledTitle = styled(Title)`
  font-size: 14px;

  @media (max-width: ${`${media.phones}`}) {
    display: none;
  }
`;

class Header extends Component {
  clickHandler = () => {
    const { loginReset, loggedIn } = this.props;
    if (loggedIn) {
      loginReset();
    }
  };

  render() {
    const { loggedIn, className } = this.props;

    return (
      <header className={className}>
        <Container>
          <StyledFlexWrapper flexBasis={`100%`}>
            <Owner />
            <StyledTitle as="h2" margin="0 0 0 20px">
              Панель администрирования
            </StyledTitle>
            <AuthLink
              clickHandler={this.clickHandler}
              preset="left"
              title={loggedIn ? "Выйти" : "Войти"}
              to={loggedIn ? "/content" : "/login"}
            />
          </StyledFlexWrapper>
        </Container>
      </header>
    );
  }
}

const StyledHeader = styled(Header)`
  width: 100%;
  background: linear-gradient(
    to right,
    ${colors.colorStart},
    ${colors.colorEnd}
  );
`;

const mapStateToProps = state => ({
  loggedIn: getLoggedStatus(state)
});

const mapDispatchToProps = { loginReset };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledHeader);
