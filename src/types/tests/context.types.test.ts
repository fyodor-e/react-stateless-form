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
  setIsSubmitting: () => {},
  submitCount: 0,
  isLoading: false,
  setIsLoading: () => {},
  handleSubmit: () => Promise.resolve(),

  isValid: true,
};
