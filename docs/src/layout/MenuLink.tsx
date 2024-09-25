import { CSSObject } from "@emotion/react";
import { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

type Props = {
  css?: CSSObject;
} & NavLinkProps;

const HeaderLink: FC<Props> = ({ children, css, ...rest }) => (
  <NavLink
    css={{
      textDecorationLine: "none",
      fontSize: "18px",
      color: "rgb(0, 116, 217)",
      ...(css ? css : {}),
      "&:hover": {
        textDecorationLine: "underline",
        ...(typeof css?.["&:hover"] === "object" ? css?.["&:hover"] : {}),
      },
    }}
    {...rest}
  >
    {children}
  </NavLink>
);

export default HeaderLink;
