import { type FC, useCallback, useMemo, DependencyList } from "react";

type ConvertFunction<
GeneratedProps extends {},
ComponentProps extends GeneratedProps,
PassedProps extends ComponentProps,
> = (
  props: PassedProps,
) => GeneratedProps;

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

function useField<
  GeneratedProps extends {},
  ComponentProps extends GeneratedProps,
  PassedProps extends (ComponentProps & Record<ComponentPropName, FC<ComponentProps>>),
  ComponentPropName extends string = string
>({
  componentPropName,
  convertFunction,
}: {
  componentPropName: ComponentPropName;
  convertFunction: ConvertFunction<GeneratedProps, ComponentProps, PassedProps>;
}, deps: DependencyList): FC<PassedProps> {
  return useCallback<FC<PassedProps>>(
    (props) => {
      const generatedProps = convertFunction(props);
      const Component: FC<ComponentProps> = props[componentPropName]
      return <Component {...props} {...generatedProps} />;
    },
    [componentPropName, deps],
  );
}

export default useField;
