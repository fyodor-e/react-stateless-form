import { DeepPick, FormControl, KeyPaths } from "../types";
import { useCallback } from "react";
import { getIn } from "../utils";

export const useSubform = <
  Values extends object,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
  Value = DeepPick<Values, Name>,
>({
  values,
  errors,
  touched,
  dirty,

  setFieldValue,
  setFieldError,
  setFieldTouched,
  setFieldDirty,

  name,

  ...rest
}: {
  name: Name;
} & Omit<FormControl<Values>, "handleSubmit">): Value extends object
  ? Omit<FormControl<Value>, "handleSubmit">
  : never =>
  ({
    // No need to wrap in useMemo, as getIn always return same object if it was not changed
    values: getIn<any, any>({ name, values }),
    errors: getIn<any, any>({ name, values: errors }) ?? {},
    dirty: getIn<any, any>({ name, values: dirty }) ?? {},
    touched: getIn<any, any>({ name, values: touched }) ?? {},

    setFieldValue: useCallback(
      ({ name: subName, value }: { name: any; value: any }) => {
        setFieldValue<any>({
          name: name + (subName ? `.${subName}` : ""),
          value,
        });
      },
      [setFieldValue, name],
    ),
    setFieldError: useCallback(
      ({ name: subName, error }: { name: any; error: any }) => {
        setFieldError<any>({
          name: name + (subName ? `.${subName}` : ""),
          error,
        });
      },
      [setFieldError, name],
    ),
    setFieldTouched: useCallback(
      ({ name: subName, touched }: { name: any; touched: any }) => {
        setFieldTouched<any>({
          name: name + (subName ? `.${subName}` : ""),
          touched,
        });
      },
      [setFieldTouched, name],
    ),
    setFieldDirty: useCallback(
      ({ name: subName, dirty }: { name: any; dirty: any }) => {
        setFieldDirty<any>({
          name: name + (subName ? `.${subName}` : ""),
          dirty,
        });
      },
      [setFieldDirty, name],
    ),
    // submitCount, isSubmitting and isValid are primitive types
    // so no need to wrap them in useMemo
    ...rest,
  }) as any;
