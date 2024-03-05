import { type FC, useCallback, useMemo, DependencyList } from "react";
import { KeyPaths } from "@react-stateless-form/types";

type FormProps = {
  value: any | undefined;
  error: string | undefined;
  touched: boolean | undefined;
  onBlur: () => void;
};

// function useField<
//   ComponentProps extends Record<string, any>,
//   GeneratedProps extends Partial<ComponentProps>,
//   PassedProps extends ComponentProps,
// >({
//   Component,
//   convertFunction,
// }: {
//   Component?: undefined;
//   convertFunction: ConvertFunction<PassedProps, GeneratedProps>;
// }, deps: DependencyList): (Component: FC<ComponentProps>) => FC<PassedProps>;
// function useField<
//   ComponentProps extends Record<string, any>,
//   GeneratedProps extends Partial<ComponentProps>,
//   PassedProps extends ComponentProps,
// >({
//   Component,
//   convertFunction,
// }: {
//   Component: FC<ComponentProps>;
//   convertFunction: ConvertFunction<PassedProps, GeneratedProps>;
// }, deps: DependencyList): FC<PassedProps>;

type FormErrors<V> = {
  [K in keyof V]?: V[K] extends (infer A)[]
    ? string | string[] | FormErrors<A>[]
    : V[K] extends object
      ? FormErrors<V[K]>
      : string;
};

type FormTouched<V> = {
  [K in keyof V]?: V[K] extends (infer A)[]
    ? FormTouched<A>[]
    : V[K] extends object
      ? FormTouched<V[K]>
      : boolean;
};

type ConvertFunction<
  ComponentProps extends {},
  AdditionalProps extends {} = {},
> = (
  props: Partial<ComponentProps> & FormProps & AdditionalProps,
) => ComponentProps;

type DisplayLoading<
  ComponentProps extends {},
  AdditionalProps extends {} = {},
> = (props: Partial<ComponentProps> & FormProps & AdditionalProps) => boolean;

const defaultDisplayLoading: DisplayLoading<{}> = ({ value }) =>
  value === undefined;

const defaultConvertFunction = <ComponentProps extends {} = {}>(
  props: ComponentProps,
) => props;

function useField<
  Values extends {},
  ComponentProps extends {},
  AdditionalProps extends object = object,
  AsProp extends string = "as",
  NameProp extends string = "name",
>(
  {
    values,
    convertFunction, // = defaultConvertFunction<ComponentProps>,
    asProp = "as",
    nameProp = "name",
    Loading,
    displayLoading = defaultDisplayLoading,
  }: {
    values: Values;
    errors: FormErrors<Values>;
    touched: FormTouched<Values>;

    convertFunction: ConvertFunction<ComponentProps, AdditionalProps>;
    Loading?: FC<Partial<ComponentProps> & FormProps & AdditionalProps>;
    displayLoading?: DisplayLoading<ComponentProps, AdditionalProps>;
  } & (AsProp extends "as" ? { asProp?: "as" } : { asProp: AsProp }) &
    (NameProp extends "name" ? { nameProp?: "name" } : { nameProp: NameProp }),
  deps: DependencyList,
): FC<
  AdditionalProps & { [K in AsProp]: FC<ComponentProps> } & {
    [N in NameProp]: KeyPaths<Values>;
  } & Partial<ComponentProps>
> {
  return useCallback<
    FC<
      AdditionalProps & {
        [K in AsProp]: FC<ComponentProps>;
      } & {
        [N in NameProp]: string;
      } & Partial<ComponentProps>
    >
  >(
    (props) => {
      const generatedProps = convertFunction({
        ...props,
        value: 1,
        error: "error",
        touched: true,
        onBlur: () => {},
      });
      const isLoading = displayLoading({
        ...props,
        value: 1,
        error: "error",
        touched: true,
        onBlur: () => {},
      });
      const { [asProp]: C, ...restProps } = props as any;
      const Component = C as FC<ComponentProps>;

      if (isLoading && Loading)
        return <Loading {...restProps} {...generatedProps} />;

      return <Component {...restProps} {...generatedProps} />;
    },
    [deps],
  );
}

export default useField;
