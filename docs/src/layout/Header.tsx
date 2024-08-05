import { FC } from "react";

const Header: FC = () => {
  return (
    <div
      css={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f6f6f7",
      }}
    >
      <span css={{ fontSize: "16px", marginLeft: "10px" }}>
        React Stateless Form
      </span>
    </div>
  );
};

export default Header;
