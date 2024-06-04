import {
  FormState,
  FormErrors,
  FormProps,
  FormTouched,
} from "@react-stateless-form/types";
import { setIn } from "@react-stateless-form/utils";
import { useCallback, SetStateAction } from "react";

const useForm = <
  Values extends {},
  SetValues extends
    | ((arg: Values) => void)
    | ((arg: SetStateAction<Values>) => void),
  SetErrors extends
    | ((arg: FormErrors<Values>) => void)
    | ((arg: SetStateAction<FormErrors<Values>>) => void),
  SetTouched extends
    | ((arg: FormTouched<Values>) => void)
    | ((arg: SetStateAction<FormTouched<Values>>) => void),
>({
  values,
  setValues,
  errors,
  setErrors,
  touched,
  setTouched,

  setFieldValue,
  setFieldError,
  setFieldTouched,
}: FormProps<Values, SetValues, SetErrors, SetTouched>): FormState<Values> => {
  // 1. Types are replaced with any for compilation performance
  // 2. setField...Local variants may be used only if
  //    set... functions accept function as argument.
  //    Otherwise setField... functions should be provided as arguments
  //    and setField...Local variants will never be called.
  const setFieldValueLocal: any = useCallback(
    (arg: { name: any; value: any }) => {
      (setValues as any)((prev: Values) => setIn({ values: prev, ...arg }));
    },
    [setValues],
  );
  const setFieldErrorLocal: any = useCallback(
    ({ name, error }: { name: any; error: any }) => {
      (setErrors as any)((prev: FormErrors<Values>) =>
        setIn({ values: prev, name, value: error }),
      );
    },
    [setErrors],
  );
  const setFieldTouchedLocal: any = useCallback(
    ({ name }: { name: any }) => {
      (setTouched as any)((prev: FormTouched<Values>) =>
        setIn<any, any>({ values: prev, name, value: true }),
      );
    },
    [setTouched],
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    setTouched,

    setFieldValue: setFieldValue ?? setFieldValueLocal,
    setFieldTouched: setFieldTouched ?? setFieldTouchedLocal,
    setFieldError: setFieldError ?? setFieldErrorLocal,
  };
};

export default useForm;
