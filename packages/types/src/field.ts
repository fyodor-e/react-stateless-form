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
  BaseProps extends { value: any } = DefaultBaseProps,
> = {
  value: DeepPick<Values, Name>;
} & Omit<BaseProps, "value">;

export type DefaultBaseProps = {
  value: any;
  onBlur?: () => void;
  onChange?: (arg: { target: { value: string | number } }) => void;
  error?: string;
  touched?: boolean;
};

export type Modifiers<
  Values extends object,
  BaseProps extends { value: any } = DefaultBaseProps,
> = {
  converter?: ConvertFunction<Values, BaseProps>;
  LoadingComponent?: FC<BasePropsCreator<Values, KeyPaths<Values>, BaseProps>>;
  displayLoading?: DisplayLoading<Values>;
};

export type FieldProps<
  Values extends object,
  ComponentProps extends BasePropsCreator<Values, Name, BaseProps>,
  BaseProps extends { value: any } = DefaultBaseProps,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
> = {
  modifiers: Modifiers<Values, BaseProps>;
  formControl: FormControl<Values>;
} & NameAndComponentProps<Values, ComponentProps, Name> &
  Omit<ComponentProps, keyof BaseProps> &
  Partial<BasePropsCreator<Values, Name, BaseProps>>;
