import { FC } from "react";
import { Field } from "../src/Field";
import { FormControl } from "@react-stateless-form/types";
import useFieldArray from "../src/useFieldArray";
import { expectType } from "@react-stateless-form/types";

type Values = {
  prop1: "prop1";
  embeddedObj: {
    prop2: "prop2";
  };
  array: { arrP: string }[];
  array2: { e2: number }[];
};

const formControl: FormControl<Values> = {
  values: {
    prop1: "prop1",
    embeddedObj: {
      prop2: "prop2",
    },
    array: [],
    array2: [],
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
  handleSubmit: () => Promise.resolve(),
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
    // @ts-expect-error
    name: "embeddedObj",
  });

  // @ts-expect-error
  expectType<typeof append, (e: Values["array"][number]) => void>(() => {});
};

const NameIsArrayIndex = () => {
  const { append } = useFieldArray({
    formControl,
    // @ts-expect-error
    name: "array.0",
  });

  // @ts-expect-error
  expectType<typeof append, (e: Values["array"][number]) => void>(() => {});
};
