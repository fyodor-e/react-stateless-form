import { KeyPaths } from "./keyPaths";
import { FormControl } from "./formControl";
import { DefaultBaseProps } from "./field";

export type ConvertFunction<
  ValueName extends string = "value",
  BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
> = (props: { rsfName: string; formControl: FormControl<any> }) => BaseProps;

export type DefaultConvertFunction = (props: {
  rsfName: KeyPaths<any>;
  formControl: Pick<
    FormControl<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >;
}) => {
  value: any;
} & DefaultBaseProps;
