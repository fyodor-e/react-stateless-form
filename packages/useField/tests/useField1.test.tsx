import { FormContext } from "@react-stateless-form/types";
import { FC, useEffect, useRef } from "react";
import useField from "../src/useField";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

type Values = {
  prop1: "prop1";
};

const context: FormContext<Values> = {
  values: { prop1: "prop1" },
  touched: {},
  errors: {},
  setValue: () => {},
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
  Partial<SimpleComponentProps> & { context: FormContext<Values> }
> = ({ context, ...props }) => {
  const Field = useField<Values>({
    ...context,
    convertFunction: ({ rsfName, values }) => ({
      value: "prop2",
      onBlur: () => {},
    }),
  });

  return (
    <Field
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
  const { rerender, debug } = render(<TestComponent context={context} />);
  debug();
  rerender(<TestComponent context={context} />);
  debug();
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(1);
});

test("should rerender component when prop was changed", async () => {
  const { rerender } = render(
    <TestComponent context={context} requiredProp="2" />,
  );
  rerender(<TestComponent context={context} requiredProp="3" />);
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(2);
});

test("should rerender on context change", async () => {
  const { rerender } = render(
    <TestComponent context={{ ...context }} requiredProp="2" />,
  );
  rerender(
    <TestComponent context={{ ...context, values: {} }} requiredProp="3" />,
  );
  expect(mountCounter).toBe(1);
  expect(renderCounter).toBe(2);
});
