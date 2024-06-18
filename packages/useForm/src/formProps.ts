import {
  FormErrors,
  FormControl,
  FormTouched,
  DeepPick,
  KeyPaths,
} from "@react-stateless-form/types";
import { SetStateAction } from "react";

export type ValueFunction<V extends {}> = (v: V) => void;
export type FunctionValueFunction<V extends {}> = (
  v: SetStateAction<V>,
) => void;

export type FormModifiers<Values extends object, SubmitProps = undefined> = {
  formSubmitCreator?: (arg: {
    formControl: FormControl<Values>;
    validator?: (
      formControl: FormControl<Values>,
    ) => Promise<FormErrors<Values>>;
    onSubmit?: (arg: {
      formControl: FormControl<Values>;
      submitProps: SubmitProps;
    }) => Promise<void>;
    submitCount: number;
    setSubmitCount: (submitCount: number) => void;
    isSubmitting: boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
  }) => (submitProps: SubmitProps) => Promise<void>;

  validator?: (formControl: FormControl<Values>) => Promise<FormErrors<Values>>;

  submitCount?: number;
  setSubmitCount?: (submitCount: number) => void;

  isSubmitting?: boolean;
  setIsSubmitting?: (isSubmitting: boolean) => void;
};

export type FormProps<
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
> = {
  onSubmit?: (formControl: FormControl<Values>) => Promise<void>;

  modifiers?: FormModifiers<Values, SubmitProps>;

  values: Values;
  setValues?: SetValues;
} & (
  | {
      errors?: FormErrors<Values>;
      setErrors?: undefined;
    }
  | {
      errors: FormErrors<Values>;
      setErrors: NonNullable<SetErrors>;
    }
) &
  (
    | {
        touched?: FormTouched<Values>;
        setTouched?: undefined;
      }
    | {
        touched: FormTouched<Values>;
        setTouched: NonNullable<SetTouched>;
      }
  ) &
  (
    | {
        dirty?: FormTouched<Values>;
        setDirty?: undefined;
      }
    | {
        dirty: FormTouched<Values>;
        setDirty: NonNullable<SetDirty>;
      }
  ) &
  (SetValues extends FunctionValueFunction<Values> | undefined
    ? {
        setFieldValue?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          value: DeepPick<Values, Name>;
        }) => void;
      }
    : {
        setFieldValue: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          value: DeepPick<Values, Name>;
        }) => void;
      }) &
  (SetErrors extends FunctionValueFunction<FormErrors<Values>> | undefined
    ? {
        setFieldError?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          error: DeepPick<FormErrors<Values>, Name>;
        }) => void;
      }
    : {
        setFieldError: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          error: DeepPick<FormErrors<Values>, Name>;
        }) => void;
      }) &
  (SetTouched extends FunctionValueFunction<FormTouched<Values>> | undefined
    ? {
        setFieldTouched?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
        }) => void;
      }
    : {
        setFieldTouched: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
        }) => void;
      }) &
  (SetDirty extends FunctionValueFunction<FormTouched<Values>> | undefined
    ? {
        setFieldDirty?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          isDirty: boolean;
        }) => void;
      }
    : {
        setFieldDirty: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          isDirty: boolean;
        }) => void;
      });