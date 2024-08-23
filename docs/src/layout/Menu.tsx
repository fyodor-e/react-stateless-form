import { FC } from "react";
import { Link } from "react-router-dom";
import routes from "../routes";

const Menu: FC = () => {
  return (
    <div
      css={{
        padding: "10px",
        backgroundColor: "#f6f6f7",
        fontSize: "14px",
        fontWeight: 500,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {routes.map(({ menuName, path }) => (
        <Link to={path} key={path}>
          {menuName}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
