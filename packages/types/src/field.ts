import { Component, ElementType, FC } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";
import { FormControl } from "./formControl";
import { DisplayLoading } from ".";
import { ConvertHook } from "./convertHook";

// type NameAndComponentProps<
//   Values extends object,
//   ComponentProps extends BasePropsCreator<Values, Name, ValueName, BaseProps>,
//   ValueName extends string = "value",
//   BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
//   Name extends KeyPaths<Values> = KeyPaths<Values>,
// > = {
//   rsfName: Name;
//   rsfComponent: FC<ComponentProps>;
// };

export type BasePropsCreator<
  Values extends object,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
  BaseProps extends { value?: any } = DefaultBaseProps,
> = {
  value: DeepPick<Values, Name>;
} & Omit<BaseProps, "value">;

export type DefaultBaseProps = {
  onBlur?: () => void;
  onChange?: (arg: { target: { value: string | number } }) => void;
  error?: string;
  touched?: boolean;
} & {
  value: any;
};

export type FieldProps<
  Values extends object,
  ComponentProps extends BasePropsCreator<Values, Name, BaseProps>,
  BaseProps extends { value?: any } = DefaultBaseProps,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
> = {
  formControl: FormControl<Values>;

  rsfName: Name;
  rsfComponent: ElementType<ComponentProps>;

  LoadingComponent?: FC<BasePropsCreator<any, string, BaseProps>>;
  displayLoading?: DisplayLoading;
  useConvert?: ConvertHook<Values, BaseProps>;
} & Omit<ComponentProps, keyof BaseProps> &
  Partial<BasePropsCreator<Values, Name, BaseProps>>;
