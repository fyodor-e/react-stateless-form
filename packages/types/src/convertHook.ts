import { FormControl } from "./formControl";
import { DefaultBaseProps } from "./field";

export type ConvertHook<
  ValueName extends string = "value",
  BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
> = (props: { rsfName: string; formControl: FormControl<any> }) => BaseProps;

export type DefaultConvertHook = (props: {
  rsfName: string;
  formControl: Pick<
    FormControl<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >;
}) => DefaultBaseProps<"value">;
