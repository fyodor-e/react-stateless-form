import { FC } from "react";
// import "prismjs/components/prism-clike";
import "./prism.js";
import "./prism.css"; //Example style, you can use another

type Props = {
  code: string;
};

const RawCode: FC<Props> = ({ code }) => {
  return (
    <pre css={{ maxHeight: "200px", display: "flex", padding: 0 }}>
      <code css={{ overflow: "auto" }} className="language-javascript">
        {code}
      </code>
    </pre>
  );
};

export default RawCode;
