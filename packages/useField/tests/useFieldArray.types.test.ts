import { FC } from "react";
import { Field } from "../src/Field";
import { FormControl, Modifiers } from "@react-stateless-form/types";
import useFieldArray from "../src/useFieldArray";
import { expectType } from "@react-stateless-form/types";

type Values = {
  prop1: "prop1";
  embeddedObj: {
    prop2: "prop2";
  };
  array: { arrP: string }[];
};

const formControl: FormControl<Values> = {
  values: {
    prop1: "prop1",
    embeddedObj: {
      prop2: "prop2",
    },
    array: [],
  },
  touched: {},
  errors: {},
  dirty: {},
  setValues: () => {},
  setErrors: () => {},
  setTouched: () => {},
  setDirty: () => {},
  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  submitCount: 0,
  isSubmitting: false,
};

const Success = () => {
  const { append } = useFieldArray({
    formControl,
    name: "array",
  });

  expectType<typeof append, (e: Values["array"][number]) => void>(() => {});
};

const NameIsNotArray = () => {
  const { append } = useFieldArray({
    formControl,
    name: "embeddedObj",
  });

  // @ts-expect-error
  expectType<typeof append, (e: Values["array"][number]) => void>(() => {});
};

const NameIsArrayIndex = () => {
  const { append } = useFieldArray({
    formControl,
    name: "array.0",
  });

  // @ts-expect-error
  expectType<typeof append, (e: Values["array"][number]) => void>(() => {});
};
