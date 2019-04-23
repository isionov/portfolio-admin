import React, { Component } from "react";
import styles from "./TestComp.module.css";
import styled from "styled-components";

class TestComp extends Component {
  render() {
    return (
      <div className={`${this.props.className} ${styles.red}`}>trololo</div>
    );
  }
}

export default styled(TestComp)`
  background-color: blue;
`;
