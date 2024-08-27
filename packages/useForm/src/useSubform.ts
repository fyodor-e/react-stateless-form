import {
  DeepPick,
  FormControl,
  FormErrors,
  FormTouched,
  KeyPaths,
} from "@react-stateless-form/types";
import { useCallback } from "react";
import { FormProps } from "./formProps";
import { getIn } from "@react-stateless-form/utils";

export const useSubform = <
  Values extends object,
  Name extends KeyPaths<Values> = KeyPaths<Values>,
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
} & Pick<
  FormControl<Values>,
  | "values"
  | "errors"
  | "touched"
  | "dirty"
  | "setFieldValue"
  | "setFieldError"
  | "setFieldTouched"
  | "setFieldDirty"
  | "submitCount"
  | "isSubmitting"
  | "isValid"
>): Pick<
  FormProps<
    any,
    (value: any) => void,
    (error: FormErrors<any>) => void,
    (touched: FormTouched<any>) => void,
    (dirty: FormTouched<any>) => void
  >,
  | "values"
  | "errors"
  | "dirty"
  | "touched"
  | "setValues"
  | "setErrors"
  | "setDirty"
  | "setTouched"
  | "setFieldValue"
  | "setFieldError"
  | "setFieldTouched"
  | "setFieldDirty"
  | "submitCount"
  | "isSubmitting"
> => ({
  // No need to wrap in useMemo, as getIn always return same object if it was not changed
  values: getIn<any, any>({ name, values }),
  errors: getIn<any, any>({ name, values: errors }),
  dirty: getIn<any, any>({ name, values: dirty }),
  touched: getIn<any, any>({ name, values: touched }),
  setValues: useCallback(
    (value: any) => {
      setFieldValue<any>({ name, value });
    },
    [setFieldValue, name],
  ),
  setErrors: useCallback(
    (error: any) => {
      setFieldError<any>({ name, error });
    },
    [setFieldError, name],
  ),
  setTouched: useCallback(
    (touched: any) => {
      setFieldTouched<any>({ name, touched });
    },
    [setFieldTouched, name],
  ),
  setDirty: useCallback(
    (dirty: any) => {
      setFieldDirty<any>({ name, dirty });
    },
    [setFieldDirty, name],
  ),

  setFieldValue: useCallback(
    ({ name: subName, value }: { name: any; value: any }) => {
      setFieldValue<any>({ name: `${name}.${subName}`, value });
    },
    [setFieldValue, name],
  ),
  setFieldError: useCallback(
    ({ name: subName, error }: { name: any; error: any }) => {
      setFieldError<any>({ name: `${name}.${subName}`, error });
    },
    [setFieldError, name],
  ),
  setFieldTouched: useCallback(
    ({ name: subName, touched }: { name: any; touched: any }) => {
      setFieldTouched<any>({ name: `${name}.${subName}`, touched });
    },
    [setFieldTouched, name],
  ),
  setFieldDirty: useCallback(
    ({ name: subName, dirty }: { name: any; dirty: any }) => {
      setFieldDirty<any>({ name: `${name}.${subName}`, dirty });
    },
    [setFieldDirty, name],
  ),
  // submitCount, isSubmitting and isValid are primitive types
  // so no need to wrap them in useMemo
  ...rest,
});
