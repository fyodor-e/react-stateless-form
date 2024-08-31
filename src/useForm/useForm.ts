import {
  FormControl,
  FormErrors,
  FormTouched,
} from "@react-stateless-form/types";
import {
  FormProps,
  FunctionValueFunction,
  ValueFunction,
} from "../types/formProps";
import { deepEqual, setIn } from "@react-stateless-form/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { defaultFormSubmitter } from "./defaultFormSubmitter";
import defaultUseValidate from "./defaultUseValidate";

export const useForm = <Values extends object, SubmitProps = undefined>({
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

  formSubmitCreator = defaultFormSubmitter as any,

  useValidate = defaultUseValidate as any,
  context,
  criteriaMode,
  resolver,

  submitCount: submitCountFromProps,
  setSubmitCount: setSubmitCountFromProps,

  isSubmitting: isSubmittingFromProps,
  setIsSubmitting: setIsSubmittingFromProps,
}: FormProps<Values, SubmitProps>): FormControl<Values, SubmitProps> => {
  // 1. Types are replaced with any for compilation performance
  // 2. setField...Local variants may be used only if
  //    set... functions accept function as argument.
  //    Otherwise setField... functions should be provided as arguments
  //    and setField...Local variants will never be called.
  const [internalValues, setValuesInternal] = useState<Values>(
    initialValuesFromProps ?? valuesFromProps,
  );
  const [internalErrors, setErrorsInternal] = useState<FormErrors<Values>>(
    errorsFromProps ?? {},
  );
  const [internalTouched, setTouchedInternal] = useState<FormTouched<Values>>(
    touchedFromProps ?? {},
  );
  const [internalDirty, setDirtyInternal] = useState<FormTouched<Values>>(
    dirtyFromProps ?? {},
  );
  const [internalSubmitCount, setInternalSubmitCount] = useState<number>(0);
  const [internalIsSubmitting, setInternalIsSubmitting] =
    useState<boolean>(false);

  const setFieldValueInternal = useCallback(
    (arg: { name: any; value: any }) => {
      setValuesInternal((prev) => setIn({ values: prev, ...arg }));
    },
    [],
  );

  const setFieldErrorInternal = useCallback(
    ({ name, error }: { name: any; error: any }) => {
      setErrorsInternal((prev) => setIn({ values: prev, name, value: error }));
    },
    [],
  );

  const setFieldTouchedInternal = useCallback(
    ({ name, touched }: { name: any; touched: any }) => {
      setTouchedInternal((prev) =>
        setIn({ values: prev as any, name, value: touched }),
      );
    },
    [],
  );

  const setFieldDirtyInternal = useCallback(
    ({ name, dirty }: { name: any; dirty: any }) => {
      setDirtyInternal((prev) =>
        setIn({ values: prev as any, name, value: dirty }),
      );
    },
    [],
  );

  const [initialValues, setInitialValues] = useState<Values | undefined>(
    undefined,
  );

  useEffect(() => {
    // initialValues are set only once using provided initialValuesFromProps
    if (initialValuesFromProps && !initialValues) {
      setInitialValues(initialValuesFromProps);
    }
  }, [initialValuesFromProps]);

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

  useEffect(() => {
    if (initialValues && values) {
      setFieldDirty({
        name: "" as any,
        dirty: deepEqual(initialValues, values) as any,
      });
    }
  }, [values, setFieldDirty, initialValues]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const formControlWoSubmit = useMemo<
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
    formControl: formControlWoSubmit,
    criteriaMode,
    context,
    resolver,
  });

  const handleSubmit = useMemo(
    () =>
      formSubmitCreator({
        formControl: formControlWoSubmit,
        validator,
        onSubmit,
        setSubmitCount,
        setIsSubmitting,
      }),
    [
      formControlWoSubmit,
      formSubmitCreator,

      validator,
      onSubmit,
      setSubmitCount,
      setIsSubmitting,
    ],
  );

  const formControl = useMemo<FormControl<Values, SubmitProps>>(
    () => ({
      ...formControlWoSubmit,
      handleSubmit,
    }),
    [formControlWoSubmit, handleSubmit],
  );

  return formControl;
};
