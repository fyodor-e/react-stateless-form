import { DeepPick } from "./deepPick";
import { FormTouched } from "./formTouched";
import { KeyPaths } from "./keyPaths";

export type FormErrors<V> =
  // Check for V = any
  0 extends 1 & V
    ? any
    : {
        [K in keyof V]?: V[K] extends (infer A)[]
          ? string | string[] | FormErrors<A>[]
          : V[K] extends object
            ? FormErrors<V[K]>
            : string;
      };

export type FormControl<Values extends object> = {
  values: Values;
  setValues: (arg: Values) => void;
  errors: FormErrors<Values>;
  setErrors: (arg: FormErrors<Values>) => void;
  touched: FormTouched<Values>;
  setTouched: (arg: FormTouched<Values>) => void;
  dirty: FormTouched<Values>;
  setDirty: (arg: FormTouched<Values>) => void;
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
  }) => void;
  setFieldDirty: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
    name: Name;
    isDirty: boolean;
  }) => void;

  submitCount: number;
  isSubmitting: boolean;
};
