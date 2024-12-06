import { FormControl, DefaultBaseProps } from ".";

export type ConvertHook<
  Values extends object,
  BaseProps extends { value?: any } = DefaultBaseProps,
> = (props: {
  rsfName: string;
  rsfFormControl: Omit<FormControl<Values>, "handleSubmit">;
}) => BaseProps;

export type DefaultConvertHook = (props: {
  rsfName: string;
  rsfFormControl: Pick<
    FormControl<any>,
    "values" | "errors" | "touched" | "setFieldTouched" | "setFieldValue"
  >;
}) => DefaultBaseProps;
