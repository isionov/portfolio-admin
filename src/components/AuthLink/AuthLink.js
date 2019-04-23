import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UnstiledLink = props => {
  const { to, title, clickHandler } = props;
  return (
    <Link onClick={clickHandler} to={to} className={props.className}>
      {title}
    </Link>
  );
};

export const AuthLink = styled(UnstiledLink)`
  color: rgba(255, 255, 255, 0.5);
  margin-left: auto;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
