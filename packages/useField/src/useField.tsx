import { type FC, useCallback, useMemo } from "react";
import {
  FieldType,
  DefaultBaseProps,
  UseFieldArg,
} from "@react-stateless-form/types";
import { useDefaultConvertFunction } from "./useDefaultConvertFunction";
import { defaultDisplayLoading } from "./defaultLoadingFunction";
import Renderer from "./Renderer";

const useField = <
  Values extends {},
  BaseProps extends { value: any } = DefaultBaseProps,
>({
  convertFunction,
  LoadingComponent,
  displayLoading = defaultDisplayLoading,

  // Context
  values,
  setValues,
  errors,
  setErrors,
  touched,
  setTouched,

  setFieldError,
  setFieldTouched,
  setFieldValue,
}: UseFieldArg<Values, BaseProps>): FieldType<Values, BaseProps> =>
  useCallback(
    ({ rsfName, rsfComponent: Component, ...restProps }) => {
      const generatedProps = useMemo(
        () =>
          convertFunction &&
          convertFunction({
            rsfName,
            values,
            setValues,
            errors,
            setErrors,
            touched,
            setTouched,

            setFieldError,
            setFieldTouched,
            setFieldValue,
          }),
        [
          rsfName,
          values,
          setValues,
          errors,
          setErrors,
          touched,
          setTouched,

          setFieldError,
          setFieldTouched,
          setFieldValue,
        ],
      );

      const defaultGeneratedProps = useDefaultConvertFunction({
        rsfName,
        values,
        errors,
        touched,

        // Skip typecheck for defaultconvertfunction for perf reasons
        setFieldTouched: setFieldTouched as any,
        setFieldValue: setFieldValue as any,
      });

      const isLoading = useMemo(
        () =>
          displayLoading &&
          displayLoading({
            rsfName,
            values,
            setValues,
            errors,
            setErrors,
            touched,
            setTouched,

            setFieldError,
            setFieldTouched,
            setFieldValue,
          }),
        [
          rsfName,
          values,
          setValues,
          errors,
          setErrors,
          touched,
          setTouched,

          setFieldError,
          setFieldTouched,
          setFieldValue,
        ],
      );

      if (isLoading && LoadingComponent)
        return (
          <LoadingComponent
            {...(generatedProps || defaultGeneratedProps)}
            {...(restProps as any)}
          />
        );

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
          {...(generatedProps || defaultGeneratedProps)}
          {...(restProps as any)}
        />
      );

      // return useMemo(
      //   () => <Component {...generatedProps} {...(restProps as any)} />,
      //   [...Object.values(generatedProps), ...Object.values(restProps)],
      // );
    },
    [
      convertFunction,
      LoadingComponent,
      displayLoading,

      // Context
      values,
      setValues,
      errors,
      setErrors,
      touched,
      setTouched,

      setFieldError,
      setFieldTouched,
      setFieldValue,
    ],
  );

export default useField;
