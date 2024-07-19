import { FormControl } from "@react-stateless-form/types";
import { FC, useCallback, useEffect } from "react";
import { beforeEach, expect, test, jest, describe } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getIn } from "@react-stateless-form/utils";
import useFieldArray from "../src/useFieldArray";

jest.mock("@react-stateless-form/utils", () => ({
  // getIn will have stub
  getIn: jest.fn(),
}));

type Values = {
  nestedArray: string[];
};

const formControl: FormControl<Values> = {
  values: { nestedArray: [] },
  touched: {},
  errors: {},
  dirty: {},
  setValues: () => {},
  setTouched: () => {},
  setErrors: () => {},
  setDirty: () => {},
  setFieldValue: jest.fn(),
  setFieldTouched: () => {},
  setFieldError: () => {},
  setFieldDirty: () => {},
  submitCount: 0,
  isSubmitting: false,
  handleSubmit: () => Promise.resolve(),
};

const name = "nestedArray";

beforeEach(() => {
  (getIn as any).mockReset();
  (formControl.setFieldValue as any).mockReset();
});

test("append test", () => {
  const testArray: string[] = ["one", "two", "three"];
  (getIn as any).mockReturnValueOnce(testArray);

  const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
    useFieldArray,
    { initialProps: { formControl, name } },
  );

  result.current.append("four");
  expect(formControl.setFieldValue).toBeCalledTimes(1);
  expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
    name,
    value: ["one", "two", "three", "four"],
  });
});

test("prepend test", () => {
  const testArray: string[] = ["one", "two", "three"];
  (getIn as any).mockReturnValueOnce(testArray);

  const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
    useFieldArray,
    { initialProps: { formControl, name } },
  );

  result.current.prepend("zero");
  expect(formControl.setFieldValue).toBeCalledTimes(1);
  expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
    name,
    value: ["zero", "one", "two", "three"],
  });
});

describe("insert test", () => {
  test("insert at index 0", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.insert(0, "zero");
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["zero", "one", "two", "three"],
    });
  });

  test("insert at index 2", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.insert(2, "new two");
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["one", "two", "new two", "three"],
    });
  });

  test("insert after at array", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.insert(testArray.length, "four");
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["one", "two", "three", "four"],
    });
  });

  test("insert after array end", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.insert(5, "five");
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["one", "two", "three", undefined, undefined, "five"],
    });
  });

  test("insert at negative index", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.insert(-1, "error");
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });
});

describe("swap test", () => {
  test("swap at indexes 0, 1", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(0, 1);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["two", "one", "three"],
    });
  });

  test("swap at indexes 0, 2", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(0, 2);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["three", "two", "one"],
    });
  });

  test("swap at the middle of long array", () => {
    const testArray: string[] = ["0", "1", "2", "3", "4", "5", "6"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(2, 5);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["0", "1", "5", "3", "4", "2", "6"],
    });
  });

  test("from is negative", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(-1, 2);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("to is negative", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(1, -2);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("from is more than array length", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(3, 1);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("to is more than array length", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.swap(1, 3);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });
});

describe("move test", () => {
  test("nove at indexes 0, 1", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(0, 1);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["two", "one", "three"],
    });
  });

  test("move at indexes 0, 2", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(0, 2);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["two", "three", "one"],
    });
  });

  test("move at the middle of long array", () => {
    const testArray: string[] = ["0", "1", "2", "3", "4", "5", "6"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(2, 5);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["0", "1", "3", "4", "5", "2", "6"],
    });
  });

  test("move at the middle of long array, to < from", () => {
    const testArray: string[] = ["0", "1", "2", "3", "4", "5", "6"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(5, 2);
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["0", "1", "5", "2", "3", "4", "6"],
    });
  });

  test("from is negative", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(-1, 2);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("to is negative", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(1, -2);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("from is more than array length", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(3, 1);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("to is more than array length", () => {
    (getIn as any).mockReturnValueOnce(["one", "two", "three"]);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.move(1, 3);
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });
});

describe("update test", () => {
  test("uppate at index 0", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.update(0, "zero");
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["zero", "two", "three"],
    });
  });

  test("update at index 2", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.update(2, "new two");
    expect(formControl.setFieldValue).toBeCalledTimes(1);
    expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
      name,
      value: ["one", "two", "new two"],
    });
  });

  test("update at negative index", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.update(-1, "error");
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });

  test("update at index >= arr length", () => {
    const testArray: string[] = ["one", "two", "three"];
    (getIn as any).mockReturnValueOnce(testArray);

    const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
      useFieldArray,
      { initialProps: { formControl, name } },
    );

    result.current.update(testArray.length, "error");
    expect(formControl.setFieldValue).toBeCalledTimes(0);
  });
});

test("replace test", () => {
  const testArray: string[] = ["one", "two", "three"];
  (getIn as any).mockReturnValueOnce(testArray);

  const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
    useFieldArray,
    { initialProps: { formControl, name } },
  );

  result.current.replace(["1", "2", "3"]);
  expect(formControl.setFieldValue).toBeCalledTimes(1);
  expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
    name,
    value: ["1", "2", "3"],
  });
});

test("remove test", () => {
  const testArray: string[] = ["0", "1", "2", "3", "4", "5"];
  (getIn as any).mockReturnValueOnce(testArray);

  const { result } = renderHook<ReturnType<typeof useFieldArray>, any>(
    useFieldArray,
    { initialProps: { formControl, name } },
  );

  result.current.remove(0, 1, 3, 5, 10);
  expect(formControl.setFieldValue).toBeCalledTimes(1);
  expect((formControl.setFieldValue as any).mock.calls[0][0]).toEqual({
    name,
    value: ["2", "4"],
  });
});
