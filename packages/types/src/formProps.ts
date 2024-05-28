import { FormErrors, FormTouched } from "./context";
import { DeepPick } from "./deepPick";
import { KeyPaths } from "./keyPaths";

type ValueFunction<V extends {}> = (v: V) => void;
type FunctionValueFunction<V extends {}> = (v: (prev: V) => V) => void;

export type FormProps<
  Values extends {},
  SetValues extends ValueFunction<Values> | FunctionValueFunction<Values>,
  SetErrors extends
    | ValueFunction<FormErrors<Values>>
    | FunctionValueFunction<FormErrors<Values>>,
  SetTouched extends
    | ValueFunction<FormTouched<Values>>
    | FunctionValueFunction<FormTouched<Values>>,
> = {
  values: Values;
  setValues: SetValues;
  errors: FormErrors<Values>;
  setErrors: SetErrors;
  touched: FormTouched<Values>;
  setTouched: SetTouched;
} & (SetValues extends FunctionValueFunction<Values>
  ? {
      setFieldValue?: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
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
  (SetErrors extends FunctionValueFunction<FormErrors<Values>>
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
  (SetTouched extends FunctionValueFunction<FormTouched<Values>>
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
      });
