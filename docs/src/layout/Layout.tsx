import { useOutlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const outlet = useOutlet();
  return (
    <div
      css={{
        display: "grid",
        gridTemplateRows: "80px auto",
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
          borderBottom: "2px solid rgba(0, 116, 217, 0.1)",
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
          borderRight: "2px solid rgba(0, 116, 217, 0.1)",
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
          padding: "20px 27px 20px 10px",
          overflow: "auto",
        }}
      >
        {outlet || children}
      </div>
    </div>
  );
};

export default Layout;
