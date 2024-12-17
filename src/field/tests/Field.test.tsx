import { ConvertHook, FormControl } from "@react-stateless-form/types";
import { FC, useCallback, useEffect, useMemo } from "react";
import { Field } from "../src/Field";
import { beforeEach, expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

type Values = {
  prop1: string;
  prop2: number;
};

const formControl: FormControl<Values> = {
  values: { prop1: "prop1", prop2: 12 },
  touched: {},
  errors: {},
  dirty: {},
  setValues: () => {},
  setTouched: () => {},
  setErrors: () => {},
  setDirty: () => {},
  setFieldValue: () => {},
  setFieldTouched: () => {},
  setFieldError: () => {},
  setFieldDirty: () => {},
  submitCount: 0,
  isSubmitting: false,
  handleSubmit: () => Promise.resolve(),
  isValid: true,
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

const useConvert: ConvertHook<Values> = ({ formControl }) => {
  const onBlur = useCallback(() => {}, []);

  return useMemo(
    () => ({
      value: formControl.values["prop1"],
      onBlur,
    }),
    [formControl.values["prop1"]],
  );
};

const TestComponent: FC<
  Partial<SimpleComponentProps> & { formControl: FormControl<Values> }
> = ({ formControl, ...props }) => {
  return (
    <Field
      useConvert={useConvert}
      rsfComponent={ComponentWithRenderCounter}
      rsfName="prop1"
      requiredProp="2"
      formControl={formControl}
      {...props}
    />
  );
};

beforeEach(() => {
  mountCounter = 0;
  renderCounter = 0;
});

test("should use memoized version of the component when rendering with same props", async () => {
  const { rerender } = render(<TestComponent formControl={formControl} />);
  rerender(<TestComponent formControl={formControl} />);
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(1);
});

test("should rerender component when prop was changed", async () => {
  const { rerender } = render(
    <TestComponent formControl={formControl} requiredProp="2" />,
  );
  rerender(<TestComponent formControl={formControl} requiredProp="3" />);
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(2);
});

test("should rerender on form State change", async () => {
  const requiredProp = "2";
  const { rerender } = render(
    <TestComponent
      formControl={{ ...formControl }}
      requiredProp={requiredProp}
    />,
  );
  rerender(
    <TestComponent
      formControl={{
        ...formControl,
        values: { prop1: "another value", prop2: 12 },
      }}
      requiredProp={requiredProp}
    />,
  );
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(2);
});

test("should NOT rerender on another prop change in form State", async () => {
  const requiredProp = "2";
  const { rerender } = render(
    <TestComponent
      formControl={{ ...formControl }}
      requiredProp={requiredProp}
    />,
  );
  rerender(
    <TestComponent
      formControl={{
        ...formControl,
        values: { ...formControl.values, prop2: formControl.values.prop2 + 1 },
      }}
      requiredProp={requiredProp}
    />,
  );
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(1);
});
