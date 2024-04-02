import { DefaultBaseProps, FormContext } from "@react-stateless-form/types";
import { FC, useEffect, useRef } from "react";
import useField from "../src/useField";
import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useDefaultConvertFunction } from "../src/useDefaultConvertFunction";

const context: FormContext<{ prop1: string; prop2: number }> = {
  values: { prop1: "prop1", prop2: 1 },
  errors: { prop1: "prop1Error" },
  touched: { prop1: true },

  setErrors: jest.fn as any,
  setFieldError: jest.fn as any,
  setTouched: jest.fn as any,
  setFieldTouched: jest.fn as any,
  setValues: jest.fn as any,
  setFieldValue: jest.fn as any,
};

test("should return value, error and touched using passed rsfName", () => {
  const initialProps = {
    rsfName: "prop1",
    ...context,
  };

  const { rerender } = renderHook<
    {
      value: any;
    } & DefaultBaseProps,
    FormContext<any>
  >((props) => useDefaultConvertFunction(props), {
    initialProps,
  });
});
