import { FC } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";
import { ConvertFunction } from "./convertFunction";
import { FormControl } from "./formControl";
import { DisplayLoading } from ".";

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
  converter?: ConvertFunction<ValueName, BaseProps>;
  LoadingComponent?: FC<BasePropsCreator<any, string, ValueName, BaseProps>>;
  displayLoading?: DisplayLoading;
};

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
