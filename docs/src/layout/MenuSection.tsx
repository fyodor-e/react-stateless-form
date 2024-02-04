import { CSSObject } from "@emotion/react";
import { FC, HTMLAttributes } from "react";

type Props = {
  css?: CSSObject;
} & HTMLAttributes<HTMLSpanElement>;

const MenuSection: FC<Props> = ({ children, css, ...rest }) => (
  <span
    css={{
      fontSize: "18px",
      color: "black",
      margin: "20px 0",
      fontWeight: "700",
      ...(css ? css : {}),
    }}
    {...rest}
  >
    {children}
  </span>
);

export default MenuSection;
