import { FormControl } from "../../types";
import { expect, jest, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { defaultUseConvert } from "../defaultUseConvert";

const rsfFormControl: FormControl<{ prop1: string; prop2: number }> = {
  values: { prop1: "prop1", prop2: 1 },
  errors: { prop1: { message: "prop1Error", type: "required" } },
  touched: { prop1: true },
  dirty: {},

  setFieldError: jest.fn() as any,
  setFieldTouched: jest.fn() as any,
  setFieldValue: jest.fn() as any,
  setFieldDirty: jest.fn() as any,

  submitCount: 0,
  isSubmitting: false,
  handleSubmit: () => Promise.resolve(),

  isValid: true,
};

test("should return value, error and touched using passed rsfName", () => {
  const initialProps = {
    rsfName: "prop1",
    rsfFormControl,
  };

  const { result } = renderHook((props) => defaultUseConvert(props), {
    initialProps,
  });

  expect(result.current.value).toBe(rsfFormControl.values.prop1);
  expect(result.current.error).toBe(rsfFormControl.errors.prop1?.message);
  expect(result.current.touched).toBe(rsfFormControl.touched.prop1);

  expect(result.current.onBlur).toEqual(expect.any(Function));
  expect(result.current.onChange).toEqual(expect.any(Function));
});

test("should memoize values event if other props of the rsfFormControl has been changed", () => {
  const initialProps = {
    rsfName: "prop1",
    rsfFormControl,
  };

  const { result, rerender } = renderHook((props) => defaultUseConvert(props), {
    initialProps,
  });

  const initialValue = result.current.value;
  const initialError = result.current.error;
  const initialTouched = result.current.touched;

  const initialOnBlur = result.current.onBlur;
  const initialOnChange = result.current.onChange;

  const updatedProps: {
    rsfFormControl: FormControl<{ prop1: string; prop2: number }>;
    rsfName: string;
  } = {
    rsfName: initialProps.rsfName,
    rsfFormControl: {
      ...rsfFormControl,
      values: {
        ...rsfFormControl.values,
        prop2: rsfFormControl.values.prop2 + 10,
      },
      errors: {
        ...rsfFormControl.errors,
        prop2: { message: "another error", type: "required" },
      },
      touched: {
        ...rsfFormControl.touched,
        prop2: !rsfFormControl.touched.prop2,
      },
    },
  };

  rerender(updatedProps);

  expect(result.current.value).toBe(initialValue);
  expect(result.current.error).toBe(initialError);
  expect(result.current.touched).toBe(initialTouched);

  expect(result.current.onBlur).toBe(initialOnBlur);
  expect(result.current.onChange).toBe(initialOnChange);
});

test("should update result when rsfFormControl is changed", () => {
  const initialProps = {
    rsfName: "prop1",
    rsfFormControl,
  };

  const { result, rerender } = renderHook((props) => defaultUseConvert(props), {
    initialProps,
  });

  const initialValue = result.current.value;
  const initialError = result.current.error;
  const initialTouched = result.current.touched;

  const initialOnBlur = result.current.onBlur;
  const initialOnChange = result.current.onChange;

  rerender({
    ...initialProps,
    rsfFormControl: {
      ...initialProps.rsfFormControl,
      values: {
        ...initialProps.rsfFormControl.values,
        prop1: "another value",
      },
      errors: {
        ...initialProps.rsfFormControl.errors,
        prop1: { message: "another error", type: "required" },
      },
      touched: {
        ...initialProps.rsfFormControl.touched,
        prop1: !initialProps.rsfFormControl.touched.prop1,
      },
    },
  });

  expect(result.current.value).not.toBe(initialValue);
  expect(result.current.error).not.toBe(initialError);
  expect(result.current.touched).not.toBe(initialTouched);

  expect(result.current.onBlur).not.toBe(initialOnBlur);
  expect(result.current.onChange).not.toBe(initialOnChange);
});

test("onBlur should call setFieldTouched", () => {
  const initialProps = {
    rsfName: "prop1",
    rsfFormControl,
  };

  const { result } = renderHook((props) => defaultUseConvert(props), {
    initialProps,
  });

  result.current.onBlur && result.current.onBlur();

  expect((rsfFormControl.setFieldTouched as any).mock.calls).toHaveLength(1);
  expect((rsfFormControl.setFieldTouched as any).mock.calls[0][0]).toEqual(
    initialProps.rsfName,
  );
  expect((rsfFormControl.setFieldTouched as any).mock.calls[0][1]).toEqual(
    true,
  );
});

test("onChange should call setFieldValue", () => {
  const initialProps = {
    rsfName: "prop1",
    rsfFormControl,
  };

  const { result } = renderHook((props) => defaultUseConvert(props), {
    initialProps,
  });

  result.current.onChange &&
    result.current.onChange({ target: { value: "some value" } });

  expect((rsfFormControl.setFieldValue as any).mock.calls).toHaveLength(1);
  expect((rsfFormControl.setFieldValue as any).mock.calls[0][0]).toEqual(
    initialProps.rsfName,
  );
  expect((rsfFormControl.setFieldValue as any).mock.calls[0][1]).toEqual(
    "some value",
  );
});

test("should return undefined if error is not a string", () => {
  const initialProps = {
    rsfName: "prop1",
    rsfFormControl: {
      ...rsfFormControl,
      errors: {
        prop1: { p: "other" },
      },
    },
  };

  const { result } = renderHook((props) => defaultUseConvert(props), {
    initialProps,
  });

  expect(result.current.error).toBe(undefined);
});
