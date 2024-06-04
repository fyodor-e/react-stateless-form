import { KeyPaths } from "./keyPaths";
import { FormState } from "./formState";
import { DefaultBaseProps } from "./field";

export type ConvertFunction<
  Values extends {},
  BaseProps extends { value: any } = DefaultBaseProps,
> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormState<Values>,
) => BaseProps;

export type DefaultConvertFunction = (
  props: {
    rsfName: KeyPaths<any>;
  } & Pick<
    FormState<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >,
) => {
  value: any;
} & DefaultBaseProps;
