import { DefaultBaseProps, KeyPaths, FieldProps } from "../types";
import Renderer from "./Renderer";
import { defaultUseConvert } from "./defaultUseConvert";

export const Field = <
  Values extends object,
  ComponentProps extends { value?: any },
  BaseProps extends { value?: any } = DefaultBaseProps,
  LoadingComponentProps extends { [K in keyof BaseProps]?: any } = BaseProps,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>({
  rsfUseConvert = defaultUseConvert as any,
  rsfLoadingComponent,
  rsfFormControl,
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
  const generatedProps = rsfUseConvert({
    rsfName,
    formControl: rsfFormControl,
  });

  if (rsfFormControl.isLoading && rsfLoadingComponent) {
    const L: any = rsfLoadingComponent;
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
