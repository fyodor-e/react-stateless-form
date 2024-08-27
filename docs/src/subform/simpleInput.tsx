import { Interpolation, Theme } from "@emotion/react";
import { ComponentProps, FC } from "react";

type Props = {
  error: string | undefined;
  touched: boolean;
  label: string;
  css?: Interpolation<Theme>;
} & ComponentProps<"input">;

const SimpleInput: FC<Props> = ({ touched, error, label, css, ...rest }) => {
  const isInvalid = !!(error && touched);
  return (
    <div
      css={{ display: "flex", flexDirection: "column", gap: "10px", ...css }}
    >
      <label>{label}</label>
      <input {...rest} />
      <span css={{ color: isInvalid ? "red" : "inherit", whiteSpace: "pre" }}>
        {isInvalid ? error : " "}
      </span>
    </div>
  );
};

export default SimpleInput;
