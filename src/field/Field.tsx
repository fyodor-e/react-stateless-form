import { useMemo } from "react";
import { DefaultBaseProps, DeepPick, KeyPaths, FieldProps } from "../types";
import Renderer from "./Renderer";
import { defaultDisplayLoading } from "./defaultLoadingFunction";
import { defaultUseConvert } from "./defaultUseConvert";

export const Field = <
  Values extends object,
  ComponentProps extends { value?: any },
  BaseProps extends { value?: any } = DefaultBaseProps,
  LoadingComponentProps extends { [K in keyof BaseProps]?: any } = BaseProps,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>({
  useConvert = defaultUseConvert as any,
  displayLoading = defaultDisplayLoading,
  LoadingComponent,
  formControl,
  rsfName,
  rsfComponent: Component,
  ...restProps
}: FieldProps<
  Values,
  ComponentProps,
  BaseProps,
  LoadingComponentProps,
  Name
>) => {
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

  if (isLoading && LoadingComponent) {
    const L: any = LoadingComponent;
    return <L {...generatedProps} />;
  }

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
};
