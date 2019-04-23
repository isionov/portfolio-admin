import React, { Component } from "react";
import styled from "styled-components";
import path from "ramda/src/path";

const UnstyledIcon = props => {
  const { iconItem, preserveAspectRatio, className } = props;

  return (
    <svg
      className={className}
      viewBox={path(["viewBox"], iconItem)}
      preserveAspectRatio={preserveAspectRatio || "none"}
    >
      <use xlinkHref={path(["url"], iconItem)} />
    </svg>
  );
};

export default styled(UnstyledIcon)`
  margin: 0;
  width: 100%;
  height: 100%;
  display: block;
  fill: ${({ fill }) => `${fill || ""}`};
  stroke: ${({ stroke }) => `${stroke || ""}`};
  stroke-width: ${({ strokeWidth }) => `${strokeWidth || ""}`};
  & use {
    width: 100%;
    height: 100%;
  }
`;
