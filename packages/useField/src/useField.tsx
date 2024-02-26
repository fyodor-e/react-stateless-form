import { type FC, useCallback, useMemo, DependencyList } from "react";

type FormProps = {
  value: any | undefined
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

type Name<V, K extends keyof V = keyof V> = V extends object
  ? [K, ...Name<V[K]>]
  : V extends (infer A)[]
    ? [number, ...Name<A>]
    : [""];

type O = {
  a: string;
  c: {
    ff: number;
  };
  m: {
    x: string;
  }[];
  b: {
    d: {
      s: string;
      e: number;
    }[];
    h: boolean;
  };
};

// https://stackoverflow.com/a/49402091
type Keyof<T> = T extends any[] ? number : T extends T ? keyof T : never;
type ObjectOf<T> = T extends (infer A)[] ? A : T extends T ? T[keyof T] : never;

type K1 = Keyof<O>;
type O1 = Extract<O, object>;

type O2 = Extract<O1["b"], object>;
type K2 = Keyof<O2>;

type O3 = Extract<ObjectOf<O2>, object>;
type K3 = Keyof<O3>;

type O4 = Extract<ObjectOf<O3>, object>;
type K4 = Keyof<O4>;

type O5 = Extract<ObjectOf<O4>, object>;
type K5 = Keyof<O5>;

type Name1<
  V,
  K1 extends keyof Extract<V, object> = keyof Extract<V, object>,
  K2 extends keyof Extract<Extract<V, object>[K1], object> = keyof Extract<
    Extract<V, object>[K1],
    object
  >,
> = [K1, K2];

type ZZ = O["a"];

type OO = Name1<O>;
type NN = Extract<O[keyof O], object>;
type NN1 = Extract<O["a"], object>;

type A = {
  d: string;
}[];

const n: Name1<O, "b"> = ["b", "d"];
const nn: Name<A> = [2, ""];

type ConvertFunction<
  ComponentProps extends {},
  AdditionalProps extends {} = {},
> = (
  props: Partial<ComponentProps> & FormProps & AdditionalProps,
) => ComponentProps;

type DisplayLoading<
ComponentProps extends {},
AdditionalProps extends {} = {}
> = (props: Partial<ComponentProps> & FormProps & AdditionalProps) => boolean;

const defaultDisplayLoading: DisplayLoading<{}> = ({ value }) => value === undefined

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
    [N in NameProp]: string;
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
      })
      const { [asProp]: C, ...restProps } = props as any;
      const Component = C as FC<ComponentProps>;

      if (isLoading && Loading) return <Loading {...restProps} {...generatedProps} />

      return <Component {...restProps} {...generatedProps} />;
    },
    [deps],
  );
}

export default useField;
