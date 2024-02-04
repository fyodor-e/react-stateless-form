import { FC, PropsWithChildren, useEffect } from "react";
import Prism from "prismjs";

const RawCode: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre
      css={{
        margin: "0 !important",
        maxHeight: "500px",
        display: "flex",
        padding: 0,
      }}
    >
      <code css={{ overflow: "auto", flex: 1 }} className="language-javascript">
        {children}
      </code>
    </pre>
  );
};

export default RawCode;
