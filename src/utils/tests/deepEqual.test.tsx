import { expect, test, jest, describe, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import { deepEqual } from "../deepEqual";

describe("Array comparison", () => {
  test("Compare two arrays of different lengths", () => {
    const res = deepEqual([1, 2], [3, 4, 5]);
    expect(res).toEqual([false, false, false]);
  });

  test("Compare two arrays of same length and different elems", () => {
    const res = deepEqual([1, 2], [1, 3]);
    expect(res).toEqual([true, false]);
  });

  test("Compare two arrays of same length and same elems", () => {
    const res = deepEqual([1, 2, 3], [1, 2, 3]);
    expect(res).toEqual([true, true, true]);
  });

  test("Compare two arrays of objects", () => {
    const res = deepEqual([{ p: 1 }, { p: 2 }], [{ p: 1 }, { p: 2 }]);
    expect(res).toEqual([{ p: true }, { p: true }]);
  });

  test("Compare two arrays of different objects", () => {
    const res = deepEqual([{ p: 1 }, { p: 33 }], [{ p: 1 }, { p: 2 }]);
    expect(res).toEqual([{ p: true }, { p: false }]);
  });

  test("Compare two arrays conttaining different types of elements", () => {
    const res = deepEqual([{ p: 1 }, 2], [{ p: 1 }, 2]);
    expect(res).toEqual([{ p: true }, true]);
  });

  test("Compare arrays and not an array", () => {
    const res = deepEqual([{ p: 1 }, 2], 2 as any);
    expect(res).toEqual([{ p: false }, false]);
  });
});

describe("Object comparison", () => {
  test("Compare two objects with different number of keys", () => {
    const res = deepEqual({ p1: 1, p2: 2, p3: 3 }, { p1: 1, p2: 2 });
    expect(res).toEqual({ p1: true, p2: true, p3: false });
  });

  test("Compare two objects with different keys", () => {
    const res = deepEqual({ p1: 1, p2: 2, p3: 3 }, { p1: 1, p2: 2, p4: 4 });
    expect(res).toEqual({ p1: true, p2: true, p3: false, p4: false });
  });

  test("Compare two objects with same keys", () => {
    const res = deepEqual({ p1: 1, p2: 2, p3: "3" }, { p1: 1, p2: 2, p3: "3" });
    expect(res).toEqual({ p1: true, p2: true, p3: true });
  });
});

describe("Primitive comparison", () => {
  test("Compare two numbers", () => {
    const res = deepEqual<any>(2, 2);
    expect(res).toEqual(true);
  });

  test("Compare two strings", () => {
    const res = deepEqual<any>("str", "str");
    expect(res).toEqual(true);
  });

  test("Compare two booleans", () => {
    const res = deepEqual<any>(true, true);
    expect(res).toEqual(true);
  });

  test("Compare two undefined", () => {
    const res = deepEqual<any>(undefined, undefined);
    expect(res).toEqual(true);
  });

  test("Compare two null", () => {
    const res = deepEqual<any>(null, null);
    expect(res).toEqual(true);
  });
});

test("Compare two same nested objects", () => {
  const res = deepEqual(
    {
      p1: "p1",
      nestedObj: { p2: "2" },
      nestedArr: [{ p3: "other" }, { p4: "p4" }],
    },
    {
      p1: "p1",
      nestedObj: { p2: "2" },
      nestedArr: [{ p3: "other" }, { p4: "p4" }],
    },
  );
  expect(res).toEqual({
    p1: true,
    nestedObj: { p2: true },
    nestedArr: [{ p3: true }, { p4: true }],
  });
});

test("Compare two different nested objects", () => {
  const res = deepEqual(
    {
      p1: "p1",
      nestedObj: { p2: "2" },
      nestedArr: [{ p3: "other" }, { p4: "p4" }],
    },
    {
      p1: "p1",
      nestedObj: { p2: "2" },
      nestedArr: [{ p3: "----" }, { p4: "p4" }],
    },
  );
  expect(res).toEqual({
    p1: true,
    nestedObj: { p2: true },
    nestedArr: [{ p3: false }, { p4: true }],
  });
});
