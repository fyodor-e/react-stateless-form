import { FormControl } from "../../types";
import { beforeEach, expect, test, jest, describe } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useSubform } from "../useSubform";

type Values = {
  nestedObj: {
    prop1: string;
    prop2: number;
  };
};

const rsfFormControl: FormControl<Values> = {
  values: {
    nestedObj: {
      prop1: "123",
      prop2: 456,
    },
  },
  touched: {
    nestedObj: {
      prop1: true,
      prop2: false,
    },
  },
  errors: {
    nestedObj: {
      prop1: {
        type: "required",
        message: "Required",
      },
      prop2: {
        type: "required2",
        message: "Required2",
      },
    },
  },
  dirty: {
    nestedObj: {
      prop1: false,
      prop2: false,
    },
  },

  setFieldValue: jest.fn(),
  setFieldTouched: jest.fn(),
  setFieldError: jest.fn(),
  setFieldDirty: jest.fn(),
  submitCount: 0,
  isSubmitting: false,
  handleSubmit: () => Promise.resolve(),

  isValid: true,
};

const name = "nestedObj";

beforeEach(() => {
  // (getIn as any).mockReset();
  (rsfFormControl.setFieldValue as any).mockReset();
  (rsfFormControl.setFieldTouched as any).mockReset();
  (rsfFormControl.setFieldError as any).mockReset();
  (rsfFormControl.setFieldDirty as any).mockReset();
});

test("values test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  expect(result.current.values).toBe(rsfFormControl.values.nestedObj);
});

test("errors test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  expect(result.current.errors).toBe(rsfFormControl.errors.nestedObj);
});

test("touched test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  expect(result.current.touched).toBe(rsfFormControl.touched.nestedObj);
});

test("dirty test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  expect(result.current.dirty).toBe(rsfFormControl.dirty.nestedObj);
});

test("isSubmitting/submitCount should be returned as passed", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  expect(result.current.isSubmitting).toBe(rsfFormControl.isSubmitting);
  expect(result.current.submitCount).toBe(rsfFormControl.submitCount);
});

test("setFieldValue test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  result.current.setFieldValue("prop1", "345");
  expect(rsfFormControl.setFieldValue).toBeCalledTimes(1);
  expect((rsfFormControl.setFieldValue as any).mock.calls[0][0]).toEqual(
    `${name}.prop1`,
  );
  expect((rsfFormControl.setFieldValue as any).mock.calls[0][1]).toEqual("345");
});

test("setFieldError test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  result.current.setFieldError("prop1", {
    type: "required",
    message: "message1",
  });
  expect(rsfFormControl.setFieldError).toBeCalledTimes(1);
  expect((rsfFormControl.setFieldError as any).mock.calls[0][0]).toEqual(
    `${name}.prop1`,
  );
  expect((rsfFormControl.setFieldError as any).mock.calls[0][1]).toEqual({
    type: "required",
    message: "message1",
  });
});

test("setFieldTouched test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  result.current.setFieldTouched("prop1", true);

  expect(rsfFormControl.setFieldTouched).toBeCalledTimes(1);
  expect((rsfFormControl.setFieldTouched as any).mock.calls[0][0]).toEqual(
    `${name}.prop1`,
  );
  expect((rsfFormControl.setFieldTouched as any).mock.calls[0][1]).toEqual(
    true,
  );
});

test("setFieldDirty test", () => {
  const { result } = renderHook<any, any>(useSubform, {
    initialProps: { ...rsfFormControl, name },
  });

  result.current.setFieldDirty("prop1", true);
  expect(rsfFormControl.setFieldDirty).toBeCalledTimes(1);
  expect((rsfFormControl.setFieldDirty as any).mock.calls[0][0]).toEqual(
    `${name}.prop1`,
  );
  expect((rsfFormControl.setFieldDirty as any).mock.calls[0][1]).toEqual(true);
});
