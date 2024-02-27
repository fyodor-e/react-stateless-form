import DeepPick from "./deepPick";
import expectType from "./isTypeEquals";

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

const p1: DeepPick<TestObject, "p1"> = "p1";

const nestedObj: DeepPick<TestObject, "nestedObj"> = {
  nestedProp1: "",
  nestedArray: [{ aProp1: 0, objNestedInArr: { prop1: "" } }],
};

expectType<DeepPick<TestObject, "nestedObj.nestedProp1">, string>("");

expectType<DeepPick<TestObject, "nestedArray">, number[]>([1, 2]);
expectType<DeepPick<TestObject, "nestedArray[0]">, number>(1);
expectType<DeepPick<TestObject, "nestedArray.[1]">, number>(1);
expectType<DeepPick<TestObject, "nestedArray.2">, number>(1);

expectType<
  DeepPick<TestObject, "nestedObj.nestedArray">,
  TestObject["nestedObj"]["nestedArray"]
>([{ aProp1: 0, objNestedInArr: { prop1: "" } }]);

expectType<
  DeepPick<TestObject, "nestedObj.nestedArray.[0]">,
  TestObject["nestedObj"]["nestedArray"][0]
>({ aProp1: 0, objNestedInArr: { prop1: "" } });
expectType<
  DeepPick<TestObject, "nestedObj.nestedArray[1]">,
  TestObject["nestedObj"]["nestedArray"][0]
>({ aProp1: 0, objNestedInArr: { prop1: "" } });
expectType<
  DeepPick<TestObject, "nestedObj.nestedArray.1">,
  TestObject["nestedObj"]["nestedArray"][0]
>({ aProp1: 0, objNestedInArr: { prop1: "" } });

expectType<
  DeepPick<TestObject, "nestedObj.nestedArray.0.aProp">,
  TestObject["nestedObj"]["nestedArray"][0]["aProp1"]
>(0);

type TTT = `[0]` extends `[${number}]` ? true : false;
// ? K extends number
//   ? K : unknown : unknown
//   ? TestObject["nestedObj"]["nestedArray"] extends (infer A)[]
//     ? A
//     : unknown
//   : unknown
// : unknown;
