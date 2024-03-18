import { type FC, useCallback, useMemo } from "react";
import {
  KeyPaths,
  FieldType,
  BasePropsCreator,
  FormContext,
  DefaultBaseProps,
} from "@react-stateless-form/types";

export type ConvertFunction<
  Values extends {},
  BaseProps extends {} = DefaultBaseProps,
  ValueName extends string = "value",
> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormContext<Values>,
) => {
  [key in ValueName]: any;
} & BaseProps;

const defaultConvertFunction: ConvertFunction<any> = (props) => props as any;

type DisplayLoading<Values extends {}> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormContext<Values>,
) => boolean;

const defaultDisplayLoading: DisplayLoading<{}> = ({ values, rsfName }) =>
  values === undefined;

const useField = <
  Values extends {},
  BaseProps extends {} = DefaultBaseProps,
  ValueName extends string = "value",
>({
  convertFunction,
  LoadingComponent,
  displayLoading, // = defaultDisplayLoading,
  ...context
}: {
  convertFunction: ConvertFunction<Values, BaseProps, ValueName>;
  LoadingComponent?: FC<
    BasePropsCreator<Values, KeyPaths<Values>, BaseProps, ValueName>
  >;
  displayLoading?: DisplayLoading<Values>;
} & FormContext<Values>): FieldType<Values, BaseProps, ValueName> =>
  useCallback(({ rsfName, rsfComponent: Component, ...restProps }) => {
    const generatedProps = useMemo(
      () =>
        convertFunction({
          rsfName,
          ...context,
        }),
      [rsfName, ...Object.values(context)],
    );
    const isLoading = useMemo(
      () =>
        displayLoading &&
        displayLoading({
          rsfName,
          ...context,
        }),
      [rsfName, context],
    );

    if (isLoading && LoadingComponent)
      return <LoadingComponent {...generatedProps} {...restProps} />;

    // restProps as any is not ideal solution.
    //   - typeof generatedProps === BaseProps
    //   - typeof restProps == Omit<ComponentProps, keyof BaseProps>
    //     ComponentProps extends BaseProps
    // The problem.
    // Say BaseProps = { p: { c: string } }
    //     ComponentProps = { p: { c: string, b: number }, other: string }
    // Omit<ComponentProps, keyof BaseProps> will produce { other: string }
    // and BaseProps & Omit<ComponentProps, keyof BaseProps> will produce
    // { p: { c: string }, other: string } which is not ComponentProps
    // In most situation neted props with the same name are not passed in both
    // BaseProps and ComponentProps, so code below will work
    return useMemo(
      () => <Component {...generatedProps} {...(restProps as any)} />,
      [...Object.values(generatedProps), ...Object.values(restProps)],
    );
  }, []);

export default useField;
