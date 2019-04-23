import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getLoggedStatus } from "../../modules/Auth";

class PrivateRoute extends Component {
  renderRoute = props => {
    const { component: MyComponent, loggedIn } = this.props;
    return loggedIn ? (
      <MyComponent {...props} children={this.props.children} />
    ) : (
      <Redirect to="/login" />
    );
  };

  render() {
    const { component, loggedIn, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedStatus(state)
  };
};

export default connect(mapStateToProps)(PrivateRoute);
