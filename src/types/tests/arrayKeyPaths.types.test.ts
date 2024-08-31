import { KeyPaths, ArrayKeyPaths, expectType } from "../";

type NestedArray = {
  nestedArray: number[];
};

expectType<ArrayKeyPaths<NestedArray>, "nestedArray">("nestedArray");

type NestedArrayAndObject = {
  nestedArray: number[];
  nestedObject: { p: string };
};

expectType<ArrayKeyPaths<NestedArrayAndObject>, "nestedArray">("nestedArray");

type NestedArrayOfObjects = {
  nestedArray: {
    prop: "p1";
  }[];
};

expectType<ArrayKeyPaths<NestedArrayOfObjects>, "nestedArray">("nestedArray");

type SecondLevelNestedArrayOfObjects = {
  nestedArray1: {
    prop: "p1";
    nestedArray2: {
      prop2: "p2";
    }[];
  }[];
};

expectType<
  ArrayKeyPaths<SecondLevelNestedArrayOfObjects>,
  | "nestedArray1"
  | `nestedArray1.${number}.nestedArray2`
  | `nestedArray1[${number}].nestedArray2`
  | `nestedArray1.[${number}].nestedArray2`
>("nestedArray1");

type SecondLevelNestedArrayInAnotherObject = {
  obj: {
    nestedArray1: {
      prop: "p1";
    }[];
  };
};

expectType<
  ArrayKeyPaths<SecondLevelNestedArrayInAnotherObject>,
  "obj.nestedArray1"
>("obj.nestedArray1");

type TwoDeeplyNestedArrays = {
  obj: {
    nestedArray1: {
      prop: "p1";
      obj2: {
        prop2: "p2";
        obj3: {
          nestedArray2: {
            obj4: {
              nestedArray3: number[];
            };
          }[];
        };
      };
    }[];
  };
};

expectType<
  ArrayKeyPaths<TwoDeeplyNestedArrays>,
  | "obj.nestedArray1"
  | `obj.nestedArray1.${number}.obj2.obj3.nestedArray2`
  | `obj.nestedArray1.${number}.obj2.obj3.nestedArray2.${number}.obj4.nestedArray3`
  | `obj.nestedArray1.${number}.obj2.obj3.nestedArray2[${number}].obj4.nestedArray3`
  | `obj.nestedArray1.${number}.obj2.obj3.nestedArray2.[${number}].obj4.nestedArray3`
  | `obj.nestedArray1[${number}].obj2.obj3.nestedArray2`
  | `obj.nestedArray1[${number}].obj2.obj3.nestedArray2.${number}.obj4.nestedArray3`
  | `obj.nestedArray1[${number}].obj2.obj3.nestedArray2[${number}].obj4.nestedArray3`
  | `obj.nestedArray1[${number}].obj2.obj3.nestedArray2.[${number}].obj4.nestedArray3`
  | `obj.nestedArray1.[${number}].obj2.obj3.nestedArray2`
  | `obj.nestedArray1.[${number}].obj2.obj3.nestedArray2.${number}.obj4.nestedArray3`
  | `obj.nestedArray1.[${number}].obj2.obj3.nestedArray2[${number}].obj4.nestedArray3`
  | `obj.nestedArray1.[${number}].obj2.obj3.nestedArray2.[${number}].obj4.nestedArray3`
>("obj.nestedArray1");
