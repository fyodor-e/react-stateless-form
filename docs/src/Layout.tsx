import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import routes from "./routes";

function Layout() {
  return (
    <>
      <div style={{ flex: 0.3, borderRight: "1px gray solid" }}>
        {routes.map(({ menuName, path }) => (
          <Link to={path} key={path}>
            {menuName}
          </Link>
        ))}
      </div>
      <div style={{ flex: 0.6 }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
