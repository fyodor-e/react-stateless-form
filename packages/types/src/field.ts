import { FC, ReactNode } from "react";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";

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
  BaseProps extends {} = DefaultBaseProps,
> = {
  value: DeepPick<Values, Name>;
} & BaseProps;

export type DefaultBaseProps = {
  onBlur?: () => void;
  onChange?: (arg: { target: { value: string | number } }) => void;
  error?: string;
  touched?: boolean;
};

export type FieldType<
  Values extends {},
  BaseProps extends {} = DefaultBaseProps,
> = <
  ComponentProps extends BasePropsCreator<Values, Name, BaseProps>,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>(
  props: NameAndComponentProps<Values, ComponentProps, Name> &
    Omit<ComponentProps, keyof BasePropsCreator<Values, Name, BaseProps>> &
    Partial<BasePropsCreator<Values, Name, BaseProps>>,
) => ReactNode;
