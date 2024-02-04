import { FormProps } from "../formProps";
import { expectType } from "../isTypeEquals";

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

// SubmitProps
type SubmitProps = {
  prop1: "prop1";
};

const formPropsSubmitProps: FormProps<Values, SubmitProps> = {
  values: { p: "p" },
  errors: {},
  touched: {},
  dirty: {},

  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  onSubmit: ({ submitProps }) => {
    expectType<SubmitProps, typeof submitProps>({ prop1: "prop1" });
  },
};

// SubmitReturn
type SubmitReturn = {
  ret: "ret1";
};

const formPropsSubmitReturn: FormProps<Values, undefined, SubmitReturn> = {
  values: { p: "p" },
  errors: {},
  touched: {},
  dirty: {},

  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  onSubmit: () => ({ ret: "ret1" }),
};
