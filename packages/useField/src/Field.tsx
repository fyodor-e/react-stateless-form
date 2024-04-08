import { useMemo } from "react";
import {
  DefaultBaseProps,
  BasePropsCreator,
  KeyPaths,
  FieldProps,
} from "@react-stateless-form/types";
import Renderer from "./Renderer";

export const Field = <
  Values extends {},
  ComponentProps extends BasePropsCreator<Values, Name, BaseProps>,
  BaseProps extends { value: any } = DefaultBaseProps,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>({
  modifiers,
  rsfName,
  rsfComponent: Component,
  ...restProps
}: FieldProps<Values, ComponentProps, BaseProps, Name>) => {
  const generatedProps = useMemo(() => {
    if (!modifiers) return;
    const { converter, ...context } = modifiers;
    return converter({
      rsfName,
      ...context,
    });
  }, [rsfName, modifiers]);

  // const defaultGeneratedProps = useDefaultConvertFunction({
  //   rsfName,
  //   values,
  //   errors,
  //   touched,

  //   // Skip typecheck for defaultconvertfunction for perf reasons
  //   setFieldTouched: setFieldTouched as any,
  //   setFieldValue: setFieldValue as any,
  // });

  // const isLoading = useMemo(
  //   () =>
  //     displayLoading &&
  //     displayLoading({
  //       rsfName,
  //       values,
  //       setValues,
  //       errors,
  //       setErrors,
  //       touched,
  //       setTouched,

  //       setFieldError,
  //       setFieldTouched,
  //       setFieldValue,
  //     }),
  //   [
  //     rsfName,
  //     values,
  //     setValues,
  //     errors,
  //     setErrors,
  //     touched,
  //     setTouched,

  //     setFieldError,
  //     setFieldTouched,
  //     setFieldValue,
  //   ],
  // );

  // if (isLoading && LoadingComponent)
  //   return (
  //     <LoadingComponent
  //       {...(generatedProps || defaultGeneratedProps)}
  //       {...(restProps as any)}
  //     />
  //   );

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
