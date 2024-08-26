import { FC } from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

const Menu: FC = () => {
  return (
    <div
      css={{
        padding: "20px",
        backgroundColor: "#f6f6f7",
        fontSize: "14px",
        fontWeight: 500,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {routes.map(({ menuName, path }) => (
        <NavLink
          to={path}
          key={path}
          css={{
            textDecorationLine: "none",
            color: "inherit",
            "&:active": { color: "green" },
          }}
        >
          {menuName}
        </NavLink>
      ))}
    </div>
  );
};

export default Menu;
