import { FormControl } from "../formControl";

type Values = {
  p: "p";
};

const control: FormControl<Values> = {
  values: { p: "p" },
  errors: {},
  touched: {},
  dirty: {},

  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  isSubmitting: false,
  submitCount: 0,
  handleSubmit: () => Promise.resolve(),

  isValid: true,
};
