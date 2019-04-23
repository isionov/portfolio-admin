import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import FlexContainer from "../FlexContainer";
import Container from "../Container";
import Nav from "../Nav";
import Header from "../Header";
import About from "../About";
import Works from "../Works";
import Revs from "../Revs";
import styled from "styled-components";
import { colors, media } from "../../modules/params";

const StyledFlexWrapper = styled(FlexContainer)`
  height: 100%;
`;

const StyledContainer = styled(Container)`
  height: 100%;

  @media (max-width: ${`${media.phones}`}) {
    width: 100%;
    margin-left: 0;
  }
`;

class MainContent extends Component {
  render() {
    const { match, location } = this.props;
    return (
      <FlexContainer
        flexDirection="column"
        customWidth="100%"
        customHeight="100%"
        justifyContent="flex-start"
      >
        <Header />
        <Nav match={match} location={location} />
        <StyledFlexWrapper customWidth="100%">
          <StyledContainer>
            <Switch>
              <Route path={`${match.path}/about`} component={About} />
              <Route path={`${match.path}/works`} component={Works} />
              <Route path={`${match.path}/revs`} component={Revs} />
              <Redirect to={`${match.url}/about`} />
            </Switch>
          </StyledContainer>
        </StyledFlexWrapper>
      </FlexContainer>
    );
  }
}

export default MainContent;
