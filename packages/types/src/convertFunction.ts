import { KeyPaths } from "./keyPaths";
import { FormContext } from "./context";
import { DefaultBaseProps } from "./field";

export type ConvertFunction<
  Values extends {},
  BaseProps extends { value: any } = DefaultBaseProps,
> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormContext<Values>,
) => BaseProps;

export type DefaultConvertFunction = (
  props: {
    rsfName: KeyPaths<any>;
  } & Pick<
    FormContext<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >,
) => {
  value: any;
} & DefaultBaseProps;
