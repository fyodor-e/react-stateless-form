import expectType from "../src/isTypeEquals";
import { KeyPaths } from "../src/keyPaths";

type TestObject = {
  p1: string;
  nestedObj: {
    nestedProp1: string;
    nestedArray: {
      aProp1: number;
      objNestedInArr: {
        prop1: string;
      };
    }[];
  };
  nestedArray: number[];
};

type Keys = KeyPaths<TestObject>;

const p1: Keys = "p1";

// @ts-expect-error
const p1err1: Keys = "p1[0]";
// @ts-expect-error
const p1err2: Keys = "p1.[1]";
// @ts-expect-error
const p1err3: Keys = "p1.2";

// @ts-expect-error
const nonExisting: Keys = "nonExisting";

const nestedArray: Keys = "nestedArray";
const nestedArray0: Keys = "nestedArray[0]";
const nestedArray1: Keys = "nestedArray.1";
const nestedArray2: Keys = "nestedArray.[2]";

// @ts-expect-error
const nestedArrayErr1: Keys = "nestedArray.err";
// @ts-expect-error
const nestedArrayErr2: Keys = "nestedArray.[2].err";

const nestedObjProp1: Keys = "nestedObj.nestedProp1";

const nestedObjNestetArr: Keys = "nestedObj.nestedArray";
const nestedObjNestetArr0: Keys = "nestedObj.nestedArray.0";
const nestedObjNestetArr1: Keys = "nestedObj.nestedArray.[1]";
const nestedObjNestetArr2: Keys = "nestedObj.nestedArray[2]";

// @ts-expect-error
const nestedObjErr: Keys = "nestedObj.errProp";
// @ts-expect-error
const nestedObjErr1: Keys = "nestedObj[0]";
// @ts-expect-error
const nestedObjErr2: Keys = "nestedObj.[1]";
// @ts-expect-error
const nestedObjErr3: Keys = "nestedObj.2";

const nestedObjNestetArr0Prop1: Keys = "nestedObj.nestedArray[0].aProp1";
const nestedObjNestetArr1Prop1: Keys = "nestedObj.nestedArray.[1].aProp1";
const nestedObjNestetArr2Prop1: Keys = "nestedObj.nestedArray.2.aProp1";

// @ts-expect-error
const nestedObjNestetArr2Err: Keys = "nestedObj.nestedArray.2.err";

const nestedObjNestetArr0ObjNestedInArr: Keys =
  "nestedObj.nestedArray[0].objNestedInArr";
const nestedObjNestetArr1ObjNestedInArr: Keys =
  "nestedObj.nestedArray.[1].objNestedInArr";
const nestedObjNestetArr2ObjNestedInArr: Keys =
  "nestedObj.nestedArray.2.objNestedInArr";

const nestedObjNestetArr0ObjNestedInArrProp1: Keys =
  "nestedObj.nestedArray[0].objNestedInArr.prop1";
const nestedObjNestetArr1ObjNestedInArrProp1: Keys =
  "nestedObj.nestedArray.[1].objNestedInArr.prop1";
const nestedObjNestetArr2ObjNestedInArrProp1: Keys =
  "nestedObj.nestedArray.2.objNestedInArr.prop1";

// @ts-expect-error
const nestedObjNestetArr2ObjNestedInArrErr: Keys =
  "nestedObj.nestedArray.2.objNestedInArr.err";

type TestArray = {
  p1: string;
  nestedObj: {
    nestedProp1: string;
  };
  nestedArray: number[];
}[];

type ArrayKeys = KeyPaths<TestArray>;

const rootArray0: ArrayKeys = "0";
const rootArray1: ArrayKeys = "[1]";

// ToDo ?
// // @ts-expect-error
// const rootArray2Err: ArrayKeys = ".2";

// @ts-expect-error
const rootArray3Err: ArrayKeys = ".[3]";

const root1p1: ArrayKeys = "[1].p1";

// @ts-expect-error
const rootErr: ArrayKeys = "[1].err";

const root0NestedObj: ArrayKeys = "0.nestedObj";
const root1NestedObj: ArrayKeys = "[1].nestedObj";

const root0NestedObjNestedProp1: ArrayKeys = "0.nestedObj.nestedProp1";
const root1NestedObjNestedProp1: ArrayKeys = "[1].nestedObj.nestedProp1";

// @ts-expect-error
const rootNestedObjErr: ArrayKeys = "[1].nestedObj.err";

const root0NestedArray: ArrayKeys = "0.nestedArray";
const root1NestedArray: ArrayKeys = "[1].nestedArray";

// @ts-expect-error
const rootNestedArrayErr: ArrayKeys = "[1].nestedArray.length";

const root0NestedArray0: ArrayKeys = "0.nestedArray[0]";
const root1NestedArray1: ArrayKeys = "[1].nestedArray.1";
const root1NestedArray2: ArrayKeys = "[2].nestedArray.[2]";

// @ts-expect-error
const rootNestedArray1Err: ArrayKeys = "[1].nestedArray.[1].err";

// Union object

type UnionObject = {
  nestedObj:
    | string
    | {
        nestedProp1: string;
      }
    | string[]
    | {
        aProp1: number;
      }[];
};

type UnionObjectKeys = KeyPaths<UnionObject>;

const unionObjectKeys: UnionObjectKeys = "nestedObj";
const unionObjectKeys1: UnionObjectKeys = `nestedObj[0]`;
const unionObjectKeys2: UnionObjectKeys = "nestedObj.nestedProp1";
const unionObjectKeys3: UnionObjectKeys = `nestedObj.1`;
const unionObjectKeys4: UnionObjectKeys = `nestedObj.[2]`;
const unionObjectKeys5: UnionObjectKeys = `nestedObj[0].aProp1`;
const unionObjectKeys6: UnionObjectKeys = `nestedObj.1.aProp1`;
const unionObjectKeys7: UnionObjectKeys = `nestedObj.[2].aProp1`;

// @ts-expect-error
const unionObjectErr1: UnionObjectKeys = "[0]";
// @ts-expect-error
const unionObjectErr2: UnionObjectKeys = "1";
// @ts-expect-error
const unionObjectErr3: UnionObjectKeys = ".2";
// @ts-expect-error
const unionObjectErr4: UnionObjectKeys = "nestedObj.nestedProp1[0]";
// @ts-expect-error
const unionObjectErr5: UnionObjectKeys = "nestedObj.nestedProp1.[1]";
// @ts-expect-error
const unionObjectErr6: UnionObjectKeys = "nestedObj.nestedProp1.2";
