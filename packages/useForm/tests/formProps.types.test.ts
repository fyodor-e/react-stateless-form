import { FormProps } from "../src/formProps";
import { FormErrors, FormTouched } from "@react-stateless-form/types";
import { SetStateAction } from "react";

type Values = {
  p: "p";
};

type SetValues = (v: Values) => void;
type SetErrors = (v: FormErrors<Values>) => void;
type SetTouched = (v: FormTouched<Values>) => void;
type SetDirty = (v: FormTouched<Values>) => void;

// setFieldValues is required if setValues cannot accept function as argument

// @ts-expect-error
const formPropsError: FormProps<
  Values,
  SetValues,
  SetErrors,
  SetTouched,
  SetDirty
> = {
  values: { p: "p" },
  setValues: () => {},
  errors: {},
  setErrors: () => {},
  touched: {},
  setTouched: () => {},
  dirty: {},
  setDirty: () => {},
};

const formPropsSuccess: FormProps<
  Values,
  SetValues,
  SetErrors,
  SetTouched,
  SetDirty
> = {
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
};

// setField... functions are not required if set... functions accept function as argument
type SetValuesFunctionArg = (arg: SetStateAction<Values>) => void;
type SetErrorsFunctionArg = (arg: SetStateAction<FormErrors<Values>>) => void;
type SetTouchedFunctionArg = (arg: SetStateAction<FormTouched<Values>>) => void;
type SetDirtyFunctionArg = (arg: SetStateAction<FormTouched<Values>>) => void;

const formPropsAsSetterFunctions: FormProps<
  Values,
  SetValuesFunctionArg,
  SetErrorsFunctionArg,
  SetTouchedFunctionArg,
  SetDirtyFunctionArg
> = {
  values: { p: "p" },
  setValues: () => {},
  errors: {},
  setErrors: () => {},
  touched: {},
  setTouched: () => {},
  dirty: {},
  setDirty: () => {},
};

// set... functions can be omitted (undefined)
const formPropsWoSetterFunctions: FormProps<Values> = {
  values: { p: "p" },
};

// if setErrors is provided - errors should also be provided
// @ts-expect-error
const formPropsWithErrors: FormProps<Values, undefined, SetErrors> = {
  values: { p: "p" },
  // errors is required
  setErrors: () => {},
};

// if setTouched is provided - errors should also be provided
// @ts-expect-error
const formPropsWithTouched: FormProps<
  Values,
  undefined,
  undefined,
  SetTouched
> = {
  values: { p: "p" },
  // touched is required
  setTouched: () => {},
};

// if setDirty is provided - dirty should also be provided
// @ts-expect-error
const formPropsWithDirty: FormProps<
  Values,
  undefined,
  undefined,
  undefined,
  SetDirty
> = {
  values: { p: "p" },
  // dirty is required
  setDirty: () => {},
};
