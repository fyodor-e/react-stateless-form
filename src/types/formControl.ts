import { DeepPick } from "./deepPick";
import { FormTouched } from "./formTouched";
import { KeyPaths } from "./keyPaths";

export type ValidateResult = string | string[] | boolean | undefined;

export type FieldError = {
  type?: string;
  types?: {
    [key: string]: ValidateResult;
  };
  message?: string;
};

export type FormErrors<V> =
  // Check for V = any
  0 extends 1 & V
    ? any
    : V extends object
      ? {
          [K in keyof V]?: V[K] extends (infer A)[]
            ? FieldError | (FormErrors<A> | undefined)[]
            : FieldError | FormErrors<V[K]>;
        }
      : FieldError;

export type FormControl<Values extends object, SubmitProps = undefined> = {
  values: Values;
  errors: FormErrors<Values>;
  touched: FormTouched<Values>;
  dirty: FormTouched<Values>;
  setFieldValue: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
    name: Name;
    value: DeepPick<Values, Name>;
  }) => void;
  setFieldError: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
    name: Name;
    error: DeepPick<FormErrors<Values>, Name>;
  }) => void;
  setFieldTouched: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
    name: Name;
    touched: DeepPick<FormTouched<Values>, Name>;
  }) => void;
  setFieldDirty: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
    name: Name;
    dirty: DeepPick<FormTouched<Values>, Name>;
  }) => void;

  submitCount: number;
  isSubmitting: boolean;

  isValid: boolean;

  handleSubmit: undefined extends SubmitProps & undefined
    ? () => Promise<void>
    : (submitProps: SubmitProps) => Promise<void>;
};
