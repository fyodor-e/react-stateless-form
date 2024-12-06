import { FormControl, FormErrors, FormTouched, SetterOrValue } from "../types";
import { FormProps } from "../types/formProps";
import { getIn, isChanged, setIn } from "../utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultUseFormSubmitCreator } from "./defaultUseFormSubmitCreator";
import { defaultUseValidate } from "./defaultUseValidate";
import { defaultUseDirty } from "./defaultUseDirty";
import { defaultUseInitialValues } from "./defaultUseInitialValues";

export const useForm = <
  Values extends object,
  SubmitProps = undefined,
  SubmitReturn = void,
>({
  onSubmit,

  initialValues: initialValuesFromProps,
  values: valuesFromProps,
  setFieldValue: setFieldValueFromProps,
  errors: errorsFromProps,
  setFieldError: setFieldErrorFromProps,
  touched: touchedFromProps,
  setFieldTouched: setFieldTouchedFromProps,
  dirty: dirtyFromProps,
  setFieldDirty: setFieldDirtyFromProps,

  useFormSubmitCreator = defaultUseFormSubmitCreator,

  useValidate = defaultUseValidate,
  context,
  criteriaMode,
  resolver,

  useDirty = defaultUseDirty,
  useInitialValues = defaultUseInitialValues,

  submitCount: submitCountFromProps,
  setSubmitCount: setSubmitCountFromProps,

  isSubmitting: isSubmittingFromProps,
  setIsSubmitting: setIsSubmittingFromProps,
}: FormProps<Values, SubmitProps, SubmitReturn>): FormControl<
  Values,
  SubmitProps,
  SubmitReturn
> => {
  // 1. Types are replaced with any for compilation performance
  // 2. setField...Local variants may be used only if
  //    set... functions accept function as argument.
  //    Otherwise setField... functions should be provided as arguments
  //    and setField...Local variants will never be called.
  const [internalValues, setValuesInternal] = useState<Values>(valuesFromProps);
  const [internalErrors, setErrorsInternal] = useState<FormErrors<Values>>(
    errorsFromProps ?? ({} as any),
  );
  const [internalTouched, setTouchedInternal] = useState<FormTouched<Values>>(
    touchedFromProps ?? ({} as any),
  );
  const [internalDirty, setDirtyInternal] = useState<FormTouched<Values>>(
    dirtyFromProps ?? ({} as any),
  );
  const [internalSubmitCount, setInternalSubmitCount] = useState<number>(0);
  const [internalIsSubmitting, setInternalIsSubmitting] =
    useState<boolean>(false);

  const setFieldValueInternal = useCallback(
    (name: any, value: SetterOrValue<any>) => {
      setValuesInternal((prev) => {
        const prevValue = getIn({ values: prev, name });
        const newValue = typeof value === "function" ? value(prevValue) : value;
        if (isChanged(prevValue, newValue))
          return setIn({ values: prev, name, value: newValue });
        else return prev;
      });
    },
    [],
  );

  const setFieldErrorInternal = useCallback(
    (name: any, error: SetterOrValue<any>) => {
      setErrorsInternal((prev) => {
        const prevError = getIn({ values: prev, name });
        const newError = typeof error === "function" ? error(prevError) : error;
        if (isChanged(newError, prevError))
          return setIn({ values: prev, name, value: newError });
        else return prev;
      });
    },
    [],
  );

  const setFieldTouchedInternal = useCallback(
    (name: any, touched: SetterOrValue<any>) => {
      setTouchedInternal((prev) => {
        const prevTouched = getIn({ values: prev, name });
        const newTouched =
          typeof touched === "function" ? touched(prevTouched) : touched;
        if (isChanged(newTouched, prevTouched))
          return setIn({ values: prev, name, value: newTouched });
        else return prev;
      });
    },
    [],
  );

  const setFieldDirtyInternal = useCallback(
    (name: any, dirty: SetterOrValue<any>) => {
      setDirtyInternal((prev) => {
        const prevDirty = getIn({ values: prev, name });
        const newDirty = typeof dirty === "function" ? dirty(prevDirty) : dirty;
        if (isChanged(newDirty, prevDirty))
          return setIn({ values: prev, name, value: newDirty });
        else return prev;
      });
    },
    [],
  );

  const values = (setFieldValueFromProps && valuesFromProps) || internalValues;
  // If setErrors is provided errors will not be undefined
  const errors = (setFieldErrorFromProps && errorsFromProps) || internalErrors;
  // If setTouched is provided touched will not be undefined
  const touched =
    (setFieldTouchedFromProps && touchedFromProps) || internalTouched;
  // If setDirty is provided dirty will not be undefined
  const dirty = (setFieldDirtyFromProps && dirtyFromProps) || internalDirty;

  const setFieldValue = setFieldValueFromProps ?? setFieldValueInternal;
  const setFieldError = setFieldErrorFromProps ?? setFieldErrorInternal;
  const setFieldTouched = setFieldTouchedFromProps ?? setFieldTouchedInternal;
  const setFieldDirty = setFieldDirtyFromProps ?? setFieldDirtyInternal;

  const submitCount = submitCountFromProps ?? internalSubmitCount;
  const setSubmitCount = setSubmitCountFromProps ?? setInternalSubmitCount;

  const isSubmitting = isSubmittingFromProps ?? internalIsSubmitting;
  const setIsSubmitting = setIsSubmittingFromProps ?? setInternalIsSubmitting;

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const rsfFormControlWoSubmit = useMemo<
    Omit<FormControl<Values>, "handleSubmit">
  >(
    () => ({
      values,
      errors,
      touched,
      dirty,

      setFieldValue,
      setFieldError,
      setFieldTouched,
      setFieldDirty,

      submitCount,
      isSubmitting,

      isValid,
    }),
    [
      values,
      errors,
      touched,
      dirty,

      setFieldValue,
      setFieldError,
      setFieldTouched,
      setFieldDirty,

      submitCount,
      isSubmitting,
    ],
  );

  const validator = useValidate({
    rsfFormControl: rsfFormControlWoSubmit,
    criteriaMode: criteriaMode,
    context,
    resolver,
  });

  const initialValues = useInitialValues({
    rsfFormControl: rsfFormControlWoSubmit,
    initialValues: initialValuesFromProps,
  });

  useDirty({
    rsfFormControl: rsfFormControlWoSubmit,
    initialValues,
  });

  const handleSubmit = useFormSubmitCreator({
    rsfFormControl: rsfFormControlWoSubmit,
    validator,
    onSubmit,
    setSubmitCount,
    setIsSubmitting,
  });

  const rsfFormControl = useMemo<
    FormControl<Values, SubmitProps, SubmitReturn>
  >(
    () => ({
      ...rsfFormControlWoSubmit,
      handleSubmit,
    }),
    [rsfFormControlWoSubmit, handleSubmit],
  );

  return rsfFormControl;
};
