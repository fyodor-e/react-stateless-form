import { KeyPaths } from "./keyPaths";
import { FormControl } from "./formControl";
import { DefaultBaseProps } from "./field";

export type ConvertFunction<
  Values extends object,
  BaseProps extends { value: any } = DefaultBaseProps,
> = (props: {
  rsfName: KeyPaths<Values>;
  formControl: FormControl<Values>;
}) => BaseProps;

export type DefaultConvertFunction = (props: {
  rsfName: KeyPaths<any>;
  formControl: Pick<
    FormControl<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >;
}) => {
  value: any;
} & DefaultBaseProps;
