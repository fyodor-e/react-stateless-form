import { ElementType } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";
import { FormControl } from "./formControl";
import { DisplayLoading } from "./displayLoading";
import { ConvertHook } from "../types";

export type DefaultBaseProps = {
  onBlur?: () => void;
  onChange?: (arg: { target: { value: string | number } }) => void;
  error?: string;
  touched?: boolean;
  value: any;
};

export type FieldProps<
  Values extends object,
  ComponentProps extends { value?: any },
  BaseProps extends { value?: any } = DefaultBaseProps,
  LoadingComponentProps extends object = {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
  Value = DeepPick<Values, Name>,
> = {
  rsfFormControl: Omit<FormControl<Values>, "handleSubmit">;

  rsfName: Name;
  rsfComponent: ElementType<ComponentProps>;

  rsfLoadingComponent?: ElementType<LoadingComponentProps>;
  rsfDisplayLoading?: DisplayLoading;
  useConvert?: ConvertHook<Values, BaseProps>;
} & Omit<ComponentProps, keyof BaseProps> &
  Partial<Omit<BaseProps, "value">> &
  (Value extends ComponentProps["value"]
    ? { value?: Value }
    : { value: ComponentProps["value"] });
