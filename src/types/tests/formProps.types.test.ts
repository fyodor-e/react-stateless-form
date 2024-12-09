import { FormProps } from "../formProps";
import { expectType } from "../isTypeEquals";

type Values = {
  p: "p";
};

// setField... are required if errors, touched and dirty are provided

const formPropsError: FormProps<Values> = {
  initialValues: { p: "p" },
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
// Either values or initialValues should be provided
const formPropsWoSetterFunctions: FormProps<Values> = {
  initialValues: { p: "p" },
};

const formPropsWithValuesOnly: FormProps<Values> = {
  values: { p: "p" },
  setFieldValue: () => {},
};

// Either values or initialValues should be provided
// @ts-expect-error
const formPropsWoValuesOrInitialValues: FormProps<Values> = {};

// if setErrors is provided - errors should also be provided
// @ts-expect-error
const formPropsWithErrors: FormProps<Values> = {
  initialValues: { p: "p" },
  // errors is required
  setFieldError: () => {},
};

// if setTouched is provided - errors should also be provided
// @ts-expect-error
const formPropsWithTouched: FormProps<Values> = {
  initialValues: { p: "p" },
  // touched is required
  setFieldTouched: () => {},
};

// if setDirty is provided - dirty should also be provided
// @ts-expect-error
const formPropsWithDirty: FormProps<Values> = {
  initialValues: { p: "p" },
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
