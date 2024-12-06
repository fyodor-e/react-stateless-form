import { FC, PropsWithChildren, useEffect } from "react";
import Prism from "prismjs";

const DocLayout: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div css={{ display: "flex", flexDirection: "column" }}>{children}</div>
  );
};

export default DocLayout;
