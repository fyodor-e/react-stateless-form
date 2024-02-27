type GenNode<
  K extends string | number,
  IsRoot extends boolean,
> = IsRoot extends true
  ? `${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never)
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

type KKK<
  V extends any,
  IsRoot extends boolean = true,
  K extends keyof V = keyof V,
> = V extends (infer A)[]
  ? GenNode<number, IsRoot> | `${GenNode<number, IsRoot>}${KKK<A, false>}`
  : V extends object
    ? K extends string | number
      ? GenNode<K, IsRoot> | `${GenNode<K, IsRoot>}${KKK<V[K], false>}`
      : never
    : never;

type A = {
  n: string;
  b: { p: number; p1: string }[];
  s: { g: { pp: number }; g1: { pp1: string } };
};

type CCC = KKK<A>;

const a: A = {
  n: "123",
  b: { p: 12, p1: "" },
  s: { g: { pp: 230 }, g1: { pp1: "sdf" } },
};

const ttt: KKK<A> = ["b"];

const t2: KKK<{ p: string }> = ["p"];

type Keys2<V extends any, K1 extends keyof V, K2 extends keyof V[K1]> = [
  ...(V extends object ? [K1, ...(V[K1] extends object ? [K2] : [])] : []),
];

const getIn2 = <V extends any, K1 extends keyof V, K2 extends keyof V[K1]>(
  value: V,
  keys: Keys2<V, K1, K2>,
) => undefined;

getIn2(a, ["b", "p"]);
