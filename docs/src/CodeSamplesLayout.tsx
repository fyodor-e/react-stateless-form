import { FC, PropsWithChildren, useMemo, useState } from "react";
import Tabs from "./Tabs";
import RawCode from "./RawCode";

type Props = {
  codeFiles: {
    name: string;
    code: string;
  }[];
};

const CodeSamplesLayout: FC<PropsWithChildren<Props>> = ({
  codeFiles,
  children,
}) => {
  const tabs = useMemo(
    () => [{ name: "Example" }, ...codeFiles.map(({ name }) => ({ name }))],
    [codeFiles],
  );

  const [selected, setSelected] = useState<string>("Example");

  const selectedTabContents = useMemo(() => {
    if (selected === "Example")
      return (
        <div
          css={{
            display: "flex",
            padding: "15px",
            backgroundColor: "aliceblue",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      );
    const selectedFile =
      codeFiles.find(({ name }) => name === selected)?.code ?? "";
    return <RawCode>{selectedFile}</RawCode>;
  }, [children, codeFiles, selected]);

  return (
    <div
      css={{
        display: "flex",
        marginTop: "15px",
        marginBottom: "15px",
        flexDirection: "column",
      }}
    >
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={({ name }) => setSelected(name)}
      />
      {selectedTabContents}
    </div>
  );
};

export default CodeSamplesLayout;
