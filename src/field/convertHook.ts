import { FormControl } from "./formControl";
import { DefaultBaseProps } from "./field";

export type ConvertHook<
  Values extends object,
  BaseProps extends object,
  // BaseProps extends { value?: any } = DefaultBaseProps,
> = (props: { rsfName: string; formControl: FormControl<Values> }) => BaseProps;

export type DefaultConvertHook = (props: {
  rsfName: string;
  formControl: Pick<
    FormControl<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >;
}) => DefaultBaseProps;
