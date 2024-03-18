import { FormContext } from "@react-stateless-form/types";
import { FC, useEffect, useRef } from "react";
import { getIn } from "../src/getIn";
import { beforeEach, describe, expect, test } from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

type TestObject = {
  p1: "p1";
  p2: "p2" | undefined;
  nestedObj: {
    nestedProp1: string;
    nestedArray: {
      aProp1: number;
      objNestedInArr: {
        prop1: string;
      };
    }[];
  };
  nestedArray: { prop4: string }[];
};

const testObject: TestObject = {
  p1: "p1",
  p2: "p2",
  nestedObj: {
    nestedProp1: "nestedProp1",
    nestedArray: [
      {
        aProp1: 0,
        objNestedInArr: {
          prop1: "prop1-0",
        },
      },
      {
        aProp1: 1,
        objNestedInArr: {
          prop1: "prop1-1",
        },
      },
      {
        aProp1: 2,
        objNestedInArr: {
          prop1: "prop1-2",
        },
      },
    ],
  },
  nestedArray: [{ prop4: "prop0" }, { prop4: "prop1" }, { prop4: "prop2" }],
};

test("getIn should extract props from the object", async () => {
  expect(getIn(testObject, "p1")).toBe(testObject.p1);
  expect(getIn(testObject, "p2")).toBe(testObject.p2);

  expect(getIn(testObject, "nestedObj")).toEqual(testObject.nestedObj);

  expect(getIn(testObject, "nestedObj.nestedProp1")).toEqual(
    testObject.nestedObj.nestedProp1,
  );

  expect(getIn(testObject, "nestedArray")).toEqual(testObject.nestedArray);

  expect(getIn(testObject, "nestedArray[0]")).toEqual(
    testObject.nestedArray[0],
  );
  expect(getIn(testObject, "nestedArray.[1]")).toEqual(
    testObject.nestedArray[1],
  );
  expect(getIn(testObject, "nestedArray.2")).toEqual(testObject.nestedArray[2]);

  expect(getIn(testObject, "nestedArray[0].prop4")).toEqual(
    testObject.nestedArray[0].prop4,
  );
  expect(getIn(testObject, "nestedArray.[1].prop4")).toEqual(
    testObject.nestedArray[1].prop4,
  );
  expect(getIn(testObject, "nestedArray.2.prop4")).toEqual(
    testObject.nestedArray[2].prop4,
  );

  expect(getIn(testObject, "nestedObj.nestedArray")).toEqual(
    testObject.nestedObj.nestedArray,
  );

  expect(getIn(testObject, "nestedObj.nestedArray.[0]")).toEqual(
    testObject.nestedObj.nestedArray[0],
  );
  expect(getIn(testObject, "nestedObj.nestedArray[1]")).toEqual(
    testObject.nestedObj.nestedArray[1],
  );
  expect(getIn(testObject, "nestedObj.nestedArray.1")).toEqual(
    testObject.nestedObj.nestedArray[1],
  );

  expect(getIn(testObject, "nestedObj.nestedArray.0.aProp1")).toEqual(
    testObject.nestedObj.nestedArray[0].aProp1,
  );
  expect(getIn(testObject, "nestedObj.nestedArray[1].aProp1")).toEqual(
    testObject.nestedObj.nestedArray[1].aProp1,
  );
  expect(getIn(testObject, "nestedObj.nestedArray.[2].aProp1")).toEqual(
    testObject.nestedObj.nestedArray[2].aProp1,
  );
});

type RootArray = {
  prop1: "prop1" | "prop2" | "prop3";
  nestedObject: {
    prop2: 1 | 2 | 3;
  };
  nestedArray: {
    prop3: true | false | undefined;
  }[];
}[];

const rootArray: RootArray = [
  {
    prop1: "prop1",
    nestedObject: {
      prop2: 1,
    },
    nestedArray: [{ prop3: true }, { prop3: false }, { prop3: undefined }],
  },
  {
    prop1: "prop2",
    nestedObject: {
      prop2: 2,
    },
    nestedArray: [{ prop3: true }, { prop3: false }, { prop3: undefined }],
  },
  {
    prop1: "prop3",
    nestedObject: {
      prop2: 3,
    },
    nestedArray: [{ prop3: true }, { prop3: false }, { prop3: undefined }],
  },
];

test("getIn should extract props from the array of objects", () => {
  expect(getIn(rootArray, "[2]")).toEqual(rootArray[2]);
  expect(getIn(rootArray, "2")).toEqual(rootArray[2]);

  expect(getIn(rootArray, "[0].prop1")).toEqual(rootArray[0].prop1);
  expect(getIn(rootArray, "1.prop1")).toEqual(rootArray[1].prop1);

  expect(getIn(rootArray, "[0].nestedArray")).toEqual(rootArray[0].nestedArray);
  expect(getIn(rootArray, "[0].nestedArray[0]")).toEqual(
    rootArray[0].nestedArray[0],
  );
  expect(getIn(rootArray, "[0].nestedArray.[1]")).toEqual(
    rootArray[0].nestedArray[1],
  );
  expect(getIn(rootArray, "[0].nestedArray.2")).toEqual(
    rootArray[0].nestedArray[2],
  );
  expect(getIn(rootArray, "[0].nestedArray[0].prop3")).toEqual(
    rootArray[0].nestedArray[0].prop3,
  );
  expect(getIn(rootArray, "[0].nestedArray.[1].prop3")).toEqual(
    rootArray[0].nestedArray[1].prop3,
  );
  expect(getIn(rootArray, "[0].nestedArray.2.prop3")).toEqual(
    rootArray[0].nestedArray[2].prop3,
  );
});
