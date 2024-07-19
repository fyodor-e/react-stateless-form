import { FormControl } from "../src/formControl";

type Values = {
  p: "p";
};

const control: FormControl<Values> = {
  values: { p: "p" },
  setValues: () => {},
  errors: {},
  setErrors: () => {},
  touched: {},
  setTouched: () => {},
  dirty: {},
  setDirty: () => {},

  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  isSubmitting: false,
  submitCount: 0,
  handleSubmit: () => Promise.resolve(),
};
