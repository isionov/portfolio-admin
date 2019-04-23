import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "../../modules/params";

const UnstiledLink = props => {
  const { to, title } = props;
  return (
    <Link to={to} className={props.className}>
      {title}
    </Link>
  );
};

const getHoverStules = colorHover => css`
  color: ${`${colorHover || `${colors.commonColorLinkHover}`}`};
  border-bottom: ${({ colorHover }) =>
    `2px solid ${colorHover || `${colors.commonColorLinkHover}`}`};
`;

const NavLink = styled(UnstiledLink)`
  color: ${({ color }) => `${color || `${colors.colorDarkText}`}`};

  text-decoration: none;

  padding: ${({ padding }) => `${padding || "30px"}`};

  border-bottom: ${({ borderBottom }) =>
    `${borderBottom || "2px solid transparent"}`};

  ${({ colorHover, activeLink }) =>
    activeLink ? getHoverStules(colorHover) : ""}

  &:hover {
    ${({ colorHover }) => getHoverStules(colorHover)}
  }
`;

export default NavLink;
