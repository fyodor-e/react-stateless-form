import { FormProps } from "../src/formProps";
import { FormErrors, FormTouched } from "../src/context";
import { SetStateAction } from "react";

type Values = {
  p: "p";
};

type SetValues = (v: Values) => void;
type SetErrors = (v: FormErrors<Values>) => void;
type SetTouched = (v: FormTouched<Values>) => void;

// setFieldValues is required if setValues cannot accept function as argument

// @ts-expect-error
const formPropsError: FormProps<Values, SetValues, SetErrors, SetTouched> = {
  values: { p: "p" },
  setValues: () => {},
  errors: {},
  setErrors: () => {},
  touched: {},
  setTouched: () => {},
};

const formPropsSuccess: FormProps<Values, SetValues, SetErrors, SetTouched> = {
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

// setField... functions are not required if set... functions accept function as argument

type SetValuesFunctionArg = (arg: SetStateAction<Values>) => void;
type SetErrorsFunctionArg = (arg: SetStateAction<FormErrors<Values>>) => void;
type SetTouchedFunctionArg = (arg: SetStateAction<FormTouched<Values>>) => void;

const formPropsAsSetterFunctions: FormProps<
  Values,
  SetValuesFunctionArg,
  SetErrorsFunctionArg,
  SetTouchedFunctionArg
> = {
  values: { p: "p" },
  setValues: () => {},
  errors: {},
  setErrors: () => {},
  touched: {},
  setTouched: () => {},
};
