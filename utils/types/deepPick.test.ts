import DeepPick from "./deepPick";
import expectType from "./isTypeEquals";

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
  nestedArray: { prop4: "prop4" }[];
};

expectType<DeepPick<TestObject, "p1">, TestObject["p1"]>("p1");

expectType<DeepPick<TestObject, "p2">, TestObject["p2"]>(undefined);
expectType<DeepPick<TestObject, "p2">, TestObject["p2"]>("p2");

expectType<DeepPick<TestObject, "nestedObj">, TestObject["nestedObj"]>({
  nestedProp1: "",
  nestedArray: [{ aProp1: 0, objNestedInArr: { prop1: "" } }],
});

expectType<DeepPick<TestObject, "nestedObj.nestedProp1">, string>("");

expectType<DeepPick<TestObject, "nestedArray">, TestObject["nestedArray"]>([
  { prop4: "prop4" },
  { prop4: "prop4" },
]);

expectType<
  DeepPick<TestObject, "nestedArray[0]">,
  TestObject["nestedArray"][number]
>({ prop4: "prop4" });
expectType<
  DeepPick<TestObject, "nestedArray.[1]">,
  TestObject["nestedArray"][number]
>({ prop4: "prop4" });
expectType<
  DeepPick<TestObject, "nestedArray.2">,
  TestObject["nestedArray"][number]
>({ prop4: "prop4" });

expectType<
  DeepPick<TestObject, "nestedArray[0].prop4">,
  TestObject["nestedArray"][number]["prop4"]
>("prop4");
expectType<
  DeepPick<TestObject, "nestedArray.[1].prop4">,
  TestObject["nestedArray"][number]["prop4"]
>("prop4");
expectType<
  DeepPick<TestObject, "nestedArray.2.prop4">,
  TestObject["nestedArray"][number]["prop4"]
>("prop4");

// @ts-expect-error
expectType<DeepPick<TestObject, "nestedArray.2.err">, string>("err");

expectType<
  DeepPick<TestObject, "nestedObj.nestedArray">,
  TestObject["nestedObj"]["nestedArray"]
>([{ aProp1: 0, objNestedInArr: { prop1: "" } }]);

// nested array element
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

// nested array element prop
expectType<
  DeepPick<TestObject, "nestedObj.nestedArray.0.aProp1">,
  TestObject["nestedObj"]["nestedArray"][number]["aProp1"]
>(0);
expectType<
  DeepPick<TestObject, "nestedObj.nestedArray[1].aProp1">,
  TestObject["nestedObj"]["nestedArray"][number]["aProp1"]
>(0);
expectType<
  DeepPick<TestObject, "nestedObj.nestedArray.[2].aProp1">,
  TestObject["nestedObj"]["nestedArray"][number]["aProp1"]
>(0);

type RootArray = {
  prop1: "prop1";
  nestedObject: {
    prop2: 1;
  };
  nestedArray: {
    prop3: true;
  }[];
}[];

expectType<DeepPick<RootArray, "[2]">, RootArray[0]>({
  prop1: "prop1",
  nestedObject: {
    prop2: 1,
  },
  nestedArray: [
    {
      prop3: true,
    },
  ],
});

expectType<DeepPick<RootArray, "2">, RootArray[0]>({
  prop1: "prop1",
  nestedObject: {
    prop2: 1,
  },
  nestedArray: [
    {
      prop3: true,
    },
  ],
});

// @ts-expect-error
expectType<DeepPick<RootArray, ".2">, RootArray[0]>({
  prop1: "prop1",
  nestedObject: {
    prop2: 1,
  },
  nestedArray: [
    {
      prop3: true,
    },
  ],
});

expectType<DeepPick<RootArray, "[0].prop1">, RootArray[number]["prop1"]>(
  "prop1",
);
expectType<DeepPick<RootArray, "1.prop1">, RootArray[number]["prop1"]>("prop1");

expectType<DeepPick<RootArray, ".2.prop1">, RootArray[number]["prop1"]>(
  // @ts-expect-error
  "prop1",
);
// @ts-expect-error
expectType<DeepPick<RootArray, "[0].err">, string>("err");

expectType<
  DeepPick<RootArray, "[0].nestedArray">,
  RootArray[number]["nestedArray"]
>([{ prop3: true }]);

expectType<
  DeepPick<RootArray, "[0].nestedArray[0]">,
  RootArray[number]["nestedArray"][number]
>({ prop3: true });
expectType<
  DeepPick<RootArray, "[0].nestedArray.[1]">,
  RootArray[number]["nestedArray"][number]
>({ prop3: true });
expectType<
  DeepPick<RootArray, "[0].nestedArray.2">,
  RootArray[number]["nestedArray"][number]
>({ prop3: true });

expectType<
  DeepPick<RootArray, "[0].nestedArray[0].prop3">,
  RootArray[number]["nestedArray"][number]["prop3"]
>(true);
expectType<
  DeepPick<RootArray, "[0].nestedArray.[1].prop3">,
  RootArray[number]["nestedArray"][number]["prop3"]
>(true);
expectType<
  DeepPick<RootArray, "[0].nestedArray.2.prop3">,
  RootArray[number]["nestedArray"][number]["prop3"]
>(true);
