import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";

function Layout() {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateRows: "40px auto",
        gridTemplateColumns: "30% 70%",
        flex: 1,
        height: "100%",
      }}
    >
      <div
        css={{
          gridColumn: "1 / span 2",
          gridRow: 1,
          display: "flex",
          borderBottom: "1px gray solid",
        }}
      >
        <Header />
      </div>
      <div
        css={{
          gridColumn: 1,
          gridRow: 2,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px gray solid",
        }}
      >
        <Menu />
      </div>
      <div
        css={{
          gridColumn: 2,
          gridRow: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
