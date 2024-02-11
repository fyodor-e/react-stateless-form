import { type FC, useCallback, useMemo, DependencyList } from "react";

type OwnProps<ComponentProps = {}> = {
  as: FC<ComponentProps>;
  name: string;
};

type FormProps = {
  error: string | undefined;
  touched: boolean | undefined;
  onBlur: () => void;
};

type ConvertFunction<
  ComponentProps extends {},
  PassedProps extends ComponentProps & OwnProps<ComponentProps> & FormProps,
> = (props: PassedProps) => ComponentProps;

type ValuesFunction<Values extends {} = any> = () => { values: Values };

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

const defaultConvertFunction = <ComponentProps extends {} = {}>(props: ComponentProps) => props;

function useField<
  ComponentProps extends {},
  PassedProps extends ComponentProps & OwnProps<ComponentProps>,
  Values extends {} = any,
>(
  {
    valuesFunction,
    convertFunction = defaultConvertFunction<ComponentProps>,
  }: {
    valuesFunction: ValuesFunction<Values>;
    convertFunction?: ConvertFunction<ComponentProps, PassedProps & FormProps>;
  },
  deps: DependencyList,
): FC<PassedProps> {
  return useCallback<FC<PassedProps>>(
    (props) => {
      const generatedProps = convertFunction({
        ...props,
        error: "error",
        touched: true,
        onBlur: () => {},
      });
      const Component: FC<ComponentProps> = props.as;
      return <Component {...props} {...generatedProps} />;
    },
    [componentPropName, deps],
  );
}

export default useField;
