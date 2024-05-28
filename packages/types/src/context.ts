import { DeepPick } from "./deepPick";
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

export type FormTouched<V> =
  // Check for V = any
  0 extends 1 & V
    ? any
    : {
        [K in keyof V]?: V[K] extends (infer A)[]
          ? FormTouched<A>[]
          : V[K] extends object
            ? FormTouched<V[K]>
            : boolean;
      };

export type FormContext<
  Values extends {},
  SetValues extends (arg: Values) => void,
  SetErrors extends (arg: FormErrors<Values>) => void,
  SetTouched extends (arg: FormTouched<Values>) => void,
> = {
  values: Values;
  setValues: SetValues;
  errors: FormErrors<Values>;
  setErrors: SetErrors;
  touched: FormTouched<Values>;
  setTouched: SetTouched;
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
};
