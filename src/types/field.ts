import { Component, ElementType, FC } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";
import { FormControl } from "./formControl";
import { DisplayLoading } from "../field/displayLoading";
import { ConvertHook } from "../field/convertHook";

export type DefaultBaseProps = {
  onBlur?: () => void;
  onChange?: (arg: { target: { value: string | number } }) => void;
  error?: string;
  touched?: boolean;
  value: any;
};

export type FieldProps<
  Values extends object,
  ComponentProps extends { [K in keyof BaseProps]: any },
  BaseProps extends { value: any } = DefaultBaseProps,
  LoadingComponentProps extends object = {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
  Value = DeepPick<Values, Name>,
> = {
  formControl: FormControl<Values>;

  rsfName: Name;
  rsfComponent: ElementType<ComponentProps>;

  LoadingComponent?: ElementType<LoadingComponentProps>;
  displayLoading?: DisplayLoading;
  useConvert?: ConvertHook<Values, BaseProps>;
} & Omit<ComponentProps, keyof BaseProps> &
  Partial<Omit<BaseProps, "value">> &
  ({ value: Value } extends { value: ComponentProps["value"] }
    ? { value?: Value }
    : { value: ComponentProps["value"] });
