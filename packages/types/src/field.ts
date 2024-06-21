import { FC } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";
import { FormControl } from "./formControl";
import { DisplayLoading } from ".";
import { ConvertHook } from "./convertHook";

export type NameAndComponentProps<
  Values extends object,
  ComponentProps extends {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
> = {
  rsfName: Name;
  rsfComponent: FC<ComponentProps>;
};

export type BasePropsCreator<
  Values extends object,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
  ValueName extends string = "value",
  BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
> = {
  [key in ValueName]: DeepPick<Values, Name>;
} & Omit<BaseProps, ValueName>;

export type DefaultBaseProps<ValueName extends string = "value"> = {
  onBlur?: () => void;
  onChange?: (arg: { target: { value: string | number } }) => void;
  error?: string;
  touched?: boolean;
} & {
  [key in ValueName]: any;
};

export type Modifiers<
  ValueName extends string = "value",
  BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
> = {
  LoadingComponent?: FC<BasePropsCreator<any, string, ValueName, BaseProps>>;
  displayLoading?: DisplayLoading;
} & ("value" extends ValueName
  ? {
      useConvert?: ConvertHook<"value", BaseProps>;
    }
  : { useConvert: ConvertHook<ValueName, BaseProps> });

export type FieldProps<
  Values extends object,
  ComponentProps extends BasePropsCreator<Values, Name, ValueName, BaseProps>,
  ValueName extends string = "value",
  BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
> = {
  modifiers: Modifiers<ValueName, BaseProps>;
  formControl: FormControl<Values>;
} & NameAndComponentProps<Values, ComponentProps, Name> &
  Omit<ComponentProps, keyof BaseProps> &
  Partial<BasePropsCreator<Values, Name, ValueName, BaseProps>>;
