import { useMemo } from "react";
import {
  DefaultBaseProps,
  DeepPick,
  KeyPaths,
  FieldProps,
} from "@react-stateless-form/types";
import Renderer from "./Renderer";
import { defaultDisplayLoading } from "./defaultLoadingFunction";
import { useDefaultConvert } from "./useDefaultConvert";

export const Field = <
  Values extends object,
  ComponentProps extends object,
  BaseProps extends object,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>({
  useConvert = useDefaultConvert,
  displayLoading = defaultDisplayLoading,
  LoadingComponent,
  formControl,
  rsfName,
  rsfComponent: Component,
  ...restProps
}: FieldProps<Values, ComponentProps, BaseProps, Name>) => {
  const generatedProps = useConvert({
    rsfName,
    formControl,
  });

  const isLoading = useMemo(
    () =>
      displayLoading &&
      displayLoading({
        rsfName,
        formControl,
      }),
    [displayLoading, rsfName, formControl],
  );

  if (isLoading && LoadingComponent)
    return <LoadingComponent {...generatedProps} {...(restProps as any)} />;

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
  return (
    <Renderer
      Component={Component}
      {...generatedProps}
      {...(restProps as any)}
    />
  );

  // return useMemo(
  //   () => <Component {...generatedProps} {...(restProps as any)} />,
  //   [...Object.values(generatedProps), ...Object.values(restProps)],
  // );
};
