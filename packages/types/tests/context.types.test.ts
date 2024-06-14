import { FormContext } from "../src/formControl";

type Values = {
  p: "p";
};

const context: FormContext<Values> = {
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
