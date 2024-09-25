import { FC } from "react";
import routes from "../routes";
import MenuRoutes from "./MenuRoutes";

const Menu: FC = () => {
  return (
    <div
      css={{
        padding: "20px 10px 20px 27px",
        fontWeight: 500,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MenuRoutes routes={routes} />
    </div>
  );
};

export default Menu;
