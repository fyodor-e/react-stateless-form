import { FormProps } from "../src/formProps";
import { FormContext, FormErrors, FormTouched } from "../src/context";

type Values = {
  p: "p";
};

type SetValues = (v: Values) => void;
type SetErrors = (v: FormErrors<Values>) => void;
type SetTouched = (v: FormTouched<Values>) => void;

// setFieldValues is required if setValues cannot accept function as argument

const context: FormContext<Values, SetValues, SetErrors, SetTouched> = {
  values: { p: "p" },
  setValues: () => {},
  errors: {},
  setErrors: () => {},
  touched: {},
  setTouched: () => {},

  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
};
