import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavLink from "../NavLink";
import FlexContainer from "../FlexContainer";
import Container from "../Container";
import { colors } from "../../modules/params";
import styled from "styled-components";

const StyledFlexWrapper = styled(FlexContainer)`
  background: ${colors.commonBackgroundColorNav};
`;

const StyledNavLink = styled(NavLink)`
  padding: 15px;
`;

const Nav = props => {
  const { match, location } = props;
  let about = false;
  let works = false;
  let revs = false;
  const getActive = () => {
    const pathArr = location.pathname.split("/");

    if (pathArr.includes("about")) {
      about = true;
    }
    if (pathArr.includes("works")) {
      works = true;
    }
    if (pathArr.includes("revs")) {
      revs = true;
    }
  };
  getActive();

  return (
    <StyledFlexWrapper
      justifyContent="flex-start"
      alignItems="center"
      customWidth="100%"
    >
      <Container>
        <StyledNavLink
          activeLink={about}
          to={`${match.url}/about`}
          title="Обо мне"
        />
        <StyledNavLink
          activeLink={works}
          to={`${match.url}/works`}
          title="Работы"
        />
        <StyledNavLink
          activeLink={revs}
          to={`${match.url}/revs`}
          title="Отзывы"
        />
      </Container>
    </StyledFlexWrapper>
  );
};

export default Nav;
