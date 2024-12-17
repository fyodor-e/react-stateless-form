import { FC } from "react";
import HeaderLink from "./MenuLink";

const Header: FC = () => {
  return (
    <div
      css={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "16px 27px",
        gap: "10px",
      }}
    >
      <HeaderLink to="/react-flexible-form/">React Flexible Form</HeaderLink>

      <HeaderLink
        css={{ marginLeft: "auto" }}
        to="/react-flexible-form/getting-started/overview"
      >
        Docs
      </HeaderLink>

      <HeaderLink to="/react-flexible-form/examples/">Examples</HeaderLink>

      <HeaderLink to="https://github.com/fyodor-e/react-flexible-form">
        GitHub
      </HeaderLink>
    </div>
  );
};

export default Header;
