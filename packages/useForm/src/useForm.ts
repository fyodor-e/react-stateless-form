import {
  FormControl,
  FormErrors,
  FormTouched,
} from "@react-stateless-form/types";
import { FormProps, FunctionValueFunction, ValueFunction } from "./formProps";
import { setIn } from "@react-stateless-form/utils";
import { useCallback, useState } from "react";

const useForm = <
  Values extends object,
  SetValues extends
    | ValueFunction<Values>
    | FunctionValueFunction<Values>
    | undefined = undefined,
  SetErrors extends
    | ValueFunction<FormErrors<Values>>
    | FunctionValueFunction<FormErrors<Values>>
    | undefined = undefined,
  SetTouched extends
    | ValueFunction<FormTouched<Values>>
    | FunctionValueFunction<FormTouched<Values>>
    | undefined = undefined,
  SetDirty extends
    | ValueFunction<FormTouched<Values>>
    | FunctionValueFunction<FormTouched<Values>>
    | undefined = undefined,
  SubmitProps = undefined,
>({
  values,
  setValues: setValuesFromProps,
  errors,
  setErrors: setErrorsFromProps,
  touched,
  setTouched: setTouchedFromProps,
  dirty,
  setDirty: setDirtyFromProps,

  setFieldValue,
  setFieldError,
  setFieldTouched,
  setFieldDirty,

  modifiers,
}: FormProps<
  Values,
  SetValues,
  SetErrors,
  SetTouched,
  SetDirty,
  SubmitProps
>): FormControl<Values> => {
  // 1. Types are replaced with any for compilation performance
  // 2. setField...Local variants may be used only if
  //    set... functions accept function as argument.
  //    Otherwise setField... functions should be provided as arguments
  //    and setField...Local variants will never be called.
  const [internalValues, setInternalValues] = useState<Values>(values);
  const [internalErrors, setInternalErrors] = useState<FormErrors<Values>>(
    errors ?? {},
  );
  const [internalTouched, setInternalTouched] = useState<FormTouched<Values>>(
    touched ?? {},
  );
  const [internalDirty, setInternalDirty] = useState<FormTouched<Values>>(
    dirty ?? {},
  );
  const [internalSubmitCount, setInternalSubmitCount] = useState<number>(0);
  const [internalIsSubmitting, setInternalIsSubmitting] =
    useState<boolean>(false);

  const setValues = setValuesFromProps ?? setInternalValues;
  const setErrors = setErrorsFromProps ?? setInternalErrors;
  const setTouched = setTouchedFromProps ?? setInternalTouched;
  const setDirty = setDirtyFromProps ?? setInternalDirty;

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
        setIn({ values: prev as any, name, value: true }),
      );
    },
    [setTouched],
  );

  const setFieldDirtyLocal: any = useCallback(
    ({ name, isDirty }: { name: any; isDirty: boolean }) => {
      (setDirty as any)((prev: FormTouched<Values>) =>
        setIn({ values: prev as any, name, value: isDirty }),
      );
    },
    [setDirty],
  );

  return {
    values: (setValuesFromProps && values) || internalValues,
    setValues,

    // If setErrors is provided errors will not be undefined
    errors: (setErrorsFromProps && errors) || internalErrors,
    setErrors,

    // If setTouched is provided touched will not be undefined
    touched: (setTouchedFromProps && touched) || internalTouched,
    setTouched,

    // If setDirty is provided dirty will not be undefined
    dirty: (setDirtyFromProps && dirty) || internalDirty,
    setDirty: setDirty ?? setInternalDirty,

    setFieldValue: setFieldValue ?? setFieldValueLocal,
    setFieldError: setFieldError ?? setFieldErrorLocal,
    setFieldTouched: setFieldTouched ?? setFieldTouchedLocal,
    setFieldDirty: setFieldDirty ?? setFieldDirtyLocal,

    submitCount: modifiers?.submitCount ?? internalSubmitCount,
    isSubmitting: modifiers?.isSubmitting ?? internalIsSubmitting,
  };
};

export default useForm;
