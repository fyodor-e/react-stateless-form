import { FormControl, DefaultBaseProps } from ".";

export type ConvertHook<
  Values extends object,
  BaseProps extends { value?: any } = DefaultBaseProps,
> = (props: {
  rsfName: string;
  formControl: Omit<FormControl<Values>, "handleSubmit">;
}) => BaseProps;

export type DefaultConvertHook = (props: {
  rsfName: string;
  formControl: Pick<
    FormControl<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >;
}) => DefaultBaseProps;
