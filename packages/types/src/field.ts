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

export type FormErrors<V> = {
  [K in keyof V]?: V[K] extends (infer A)[]
    ? string | string[] | FormErrors<A>[]
    : V[K] extends object
      ? FormErrors<V[K]>
      : string;
};

export type FormTouched<V> = {
  [K in keyof V]?: V[K] extends (infer A)[]
    ? FormTouched<A>[]
    : V[K] extends object
      ? FormTouched<V[K]>
      : boolean;
};

export type FormContext<Values extends {}> = {
  values: Values;
  errors: FormErrors<Values>;
  touched: FormTouched<Values>;
};

export type DefaultBaseProps<
  Values extends {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
  BaseProps extends {} | undefined = undefined,
  ValueProp extends string = "value",
> = {
  [key in ValueProp]: DeepPick<Values, Name>;
} & (BaseProps extends undefined
  ? {
      onBlur: () => void;
    }
  : BaseProps);

// export type ConvertFunction<
//   Values extends {},
//   BaseProps extends DefaultBaseProps<
//     Values,
//     KeyPaths<Values>
//   > = DefaultBaseProps<Values, KeyPaths<Values>>,
// > = (
//   props: NameAndComponentProps<Values, BaseProps, KeyPaths<Values>> &
//     FormContext<Values>,
// ) => BaseProps;

export type FieldType<
  Values extends {},
  BaseProps extends {} | undefined = undefined,
  ValueName extends string = "value",
> = <
  ComponentProps extends DefaultBaseProps<Values, Name, BaseProps, ValueName>,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>(
  props: NameAndComponentProps<Values, ComponentProps, Name> &
    Omit<
      ComponentProps,
      keyof DefaultBaseProps<Values, Name, BaseProps, ValueName>
    > &
    Partial<DefaultBaseProps<Values, Name, BaseProps, ValueName>>,
) => ReactNode;
