import { FormProps } from "../formProps";
import { FormErrors, FormTouched } from "../";

type Values = {
  p: "p";
};

// setField... are required if errors, touched and dirty are provided

const formPropsError: FormProps<Values> = {
  values: { p: "p" },
  errors: {},
  touched: {},
  dirty: {},
};

const formPropsSuccess: FormProps<Values> = {
  values: { p: "p" },
  errors: {},
  touched: {},
  dirty: {},

  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},
};

// set... functions can be omitted (undefined)
const formPropsWoSetterFunctions: FormProps<Values> = {
  values: { p: "p" },
};

// if setErrors is provided - errors should also be provided
// @ts-expect-error
const formPropsWithErrors: FormProps<Values> = {
  values: { p: "p" },
  // errors is required
  setFieldError: () => {},
};

// if setTouched is provided - errors should also be provided
// @ts-expect-error
const formPropsWithTouched: FormProps<Values> = {
  values: { p: "p" },
  // touched is required
  setFieldTouched: () => {},
};

// if setDirty is provided - dirty should also be provided
// @ts-expect-error
const formPropsWithDirty: FormProps<Values> = {
  values: { p: "p" },
  // dirty is required
  setFieldDirty: () => {},
};
