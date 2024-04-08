import { FC, ReactNode } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";
import { ConvertFunction } from "./convertFunction";
import { FormContext } from "./context";

export type NameAndComponentProps<
  Values extends {},
  ComponentProps extends {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
> = {
  rsfName: Name;
  rsfComponent: FC<ComponentProps>;
};

export type BasePropsCreator<
  Values extends {},
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
  Values extends {},
  BaseProps extends { value: any } = DefaultBaseProps,
> = {
  converter: ConvertFunction<Values, BaseProps>;
} & FormContext<Values>;

export type FieldProps<
  Values extends {},
  ComponentProps extends BasePropsCreator<Values, Name, BaseProps>,
  BaseProps extends { value: any } = DefaultBaseProps,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
> = {
  modifiers: Modifiers<Values, BaseProps>;
} & NameAndComponentProps<Values, ComponentProps, Name> &
  Omit<ComponentProps, keyof BasePropsCreator<Values, Name, BaseProps>> &
  Partial<BasePropsCreator<Values, Name, BaseProps>>;

// export type FieldType<
//   Values extends {},
//   BaseProps extends { value: any } = DefaultBaseProps,
// > = <
//   ComponentProps extends BasePropsCreator<Values, Name, BaseProps>,
//   Name extends KeyPaths<Values> = KeyPaths<Values>,
// >(
//   props: NameAndComponentProps<Values, ComponentProps, Name> &
//     Omit<ComponentProps, keyof BasePropsCreator<Values, Name, BaseProps>> &
//     Partial<BasePropsCreator<Values, Name, BaseProps>>,
// ) => ReactNode;
