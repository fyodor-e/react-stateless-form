import { FormState, Modifiers } from "@react-stateless-form/types";
import { FC, useCallback, useEffect, useMemo } from "react";
import { Field } from "../src/Field";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import useForm from "../src/useForm";

type Values = {
  prop1: string;
  prop2: number;
};

const formState: FormState<Values> = {
  values: { prop1: "prop1", prop2: 12 },
  touched: {},
  errors: {},
  setValues: () => {},
  setTouched: () => {},
  setErrors: () => {},
  setFieldValue: () => {},
  setFieldTouched: () => {},
  setFieldError: () => {},
};

type SimpleComponentProps = {
  requiredProp: string;
  optionalProp?: number;
  value: "prop1";
  onBlur: () => void;
};

let renderCounter = 0;
let mountCounter = 0;

const ComponentWithRenderCounter: FC<SimpleComponentProps> = () => {
  renderCounter++;
  useEffect(() => {
    mountCounter++;
  }, []);
  return (
    <>
      <div id="render-counter">{renderCounter}</div>
    </>
  );
};

const TestComponent: FC<
  Partial<SimpleComponentProps> & { formState: FormState<Values> }
> = ({ formState, ...props }) => {
  const onBlur = useCallback(() => {}, []);

  const modifiers: Modifiers<Values> = {
    converter: ({ values }) => ({
      value: values["prop1"],
      onBlur,
    }),
    ...formState,
  };

  return (
    <Field
      modifiers={modifiers}
      rsfComponent={ComponentWithRenderCounter}
      rsfName="prop1"
      requiredProp="2"
      {...props}
    />
  );
};

beforeEach(() => {
  mountCounter = 0;
  renderCounter = 0;
});

test("should use memoized version of the component when rendering with same props", async () => {
  const values: Values = { prop1: "p1", prop2: 22 };
  const { setValues, setErrors } = useForm({
    values,
    setValues: (arg: Values | ((v: Values) => Values)) => {},
    errors: {},
    setErrors: () => {},
    touched: {},
    setTouched: () => {},

    setFieldValue: () => {},
    setFieldTouched: () => {},
    setFieldError: () => {},
  });
});

test("should rerender component when prop was changed", async () => {
  const { rerender } = render(
    <TestComponent formState={formState} requiredProp="2" />,
  );
  rerender(<TestComponent formState={formState} requiredProp="3" />);
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(2);
});

test("should rerender on formState change", async () => {
  const requiredProp = "2";
  const { rerender } = render(
    <TestComponent formState={{ ...formState }} requiredProp={requiredProp} />,
  );
  rerender(
    <TestComponent
      formState={{
        ...formState,
        values: { prop1: "another value", prop2: 12 },
      }}
      requiredProp={requiredProp}
    />,
  );
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(2);
});

test("should NOT rerender on another prop change in formState", async () => {
  const requiredProp = "2";
  const { rerender } = render(
    <TestComponent formState={{ ...formState }} requiredProp={requiredProp} />,
  );
  rerender(
    <TestComponent
      formState={{
        ...formState,
        values: { ...formState.values, prop2: formState.values.prop2 + 1 },
      }}
      requiredProp={requiredProp}
    />,
  );
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(1);
});
