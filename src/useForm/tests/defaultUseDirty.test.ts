import { FormControl } from "../../types";
import { beforeEach, expect, jest, test } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { defaultUseDirty } from "../defaultUseDirty";

type Values = {
  prop1: string;
  prop2: number;
};

const rsfFormControl: Omit<FormControl<Values>, "handleSubmit"> = {
  values: { prop1: "prop1", prop2: 12 },
  errors: {},
  touched: {},
  dirty: {},

  setFieldValue: jest.fn(),
  setFieldError: jest.fn(),
  setFieldTouched: jest.fn(),
  setFieldDirty: jest.fn(),

  submitCount: 0,
  isSubmitting: false,

  isValid: true,
};

beforeEach(() => {
  (rsfFormControl.setFieldDirty as any).mockReset();
});

test("Should setFieldDirty on each value change", async () => {
  renderHook(defaultUseDirty, {
    initialProps: { rsfFormControl, initialValues: undefined },
  });

  expect(rsfFormControl.setFieldDirty).toBeCalledTimes(1);
  expect((rsfFormControl.setFieldDirty as any).mock.calls[0][0]).toEqual("");
  expect((rsfFormControl.setFieldDirty as any).mock.calls[0][1]).toEqual({
    prop1: true,
    prop2: true,
  });
});

// This test should be in rsfFormControl
// test("Should not call setFieldDirty if durty value was not changed", async () => {
//   renderHook(defaultUseDirty, {
//     initialProps: {
//       rsfFormControl: { ...rsfFormControl, dirty: { prop1: false, prop2: false } },
//       initialValues: rsfFormControl.values,
//     },
//   });

//   expect(rsfFormControl.setFieldDirty).toBeCalledTimes(0);
// });
