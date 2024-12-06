import { FC } from "react";

type Tab = {
  name: string;
};

type Props = {
  tabs: Tab[];
  selected: string;
  onSelect: (tab: Tab) => void;
};

const Tabs: FC<Props> = ({ tabs, selected, onSelect }) => {
  return (
    <div css={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
      {tabs.map((tab) => (
        <button
          key={tab.name}
          css={{
            backgroundColor: selected === tab.name ? "lightblue" : undefined,
            padding: "5px",
            borderRadius: "7px",
            border: "unset",
          }}
          onClick={() => onSelect(tab)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
