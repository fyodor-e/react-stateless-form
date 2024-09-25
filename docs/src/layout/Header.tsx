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
      <HeaderLink to="/react-stateless-form/">React Stateless Form</HeaderLink>

      <HeaderLink css={{ marginLeft: "auto" }} to="/react-stateless-form/docs/">
        Docs
      </HeaderLink>

      <HeaderLink to="/react-stateless-form/examples/">Examples</HeaderLink>

      <HeaderLink to="https://github.com/fyodore82/react-stateless-form">
        GitHub
      </HeaderLink>
    </div>
  );
};

export default Header;
