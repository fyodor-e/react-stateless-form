type V = Record<string | number, any>;

type K = keyof V;

type S = `${K}`;

type Result<
  V extends (Record<string, any> | null | undefined),
  K extends keyof NonNullable<V> = keyof NonNullable<V>,
  KK extends keyof NonNullable<V>[K] = keyof NonNullable<V>[K],
> = V extends (null | undefined) ? NonNullable<NonNullable<V>[K]>[KK] | null
  : NonNullable<V>[K] extends (null | undefined) ? NonNullable<NonNullable<V>[K]>[KK] | null
  : NonNullable<NonNullable<V>[K]>[KK] extends (null | undefined) ? NonNullable<NonNullable<V>[K]>[KK] | null
  : NonNullable<NonNullable<V>[K]>[KK]

function getIn<
  V extends Record<string, any>,
  K extends keyof V = keyof V,
>(value: V, name: K): V[K];
function getIn<
  V extends (Record<string, any> | null | undefined),
  K extends keyof NonNullable<V> = keyof NonNullable<V>,
  KK extends keyof NonNullable<V>[K] = keyof NonNullable<V>[K],
>(value: V, name: `${string & K}.${string & KK}`): Result<V, K, KK>;
function getIn<
  V extends Record<string, any>,
  K extends keyof V = keyof V,
>(value: V, name: `${string & K}.[${number}]`): V[K][number];
function getIn<
  V extends Record<string, any>,
  K extends keyof V = keyof V,
  KK extends keyof V[K][number] = keyof V[K][number],
>(value: V, name: `${string & K}.[${number}].${string & KK}`): V[K][number][KK];

function getIn<
  V extends any[],
>(value: V, name: `[${number}]`): V[number];

function getIn<
  V extends any[],
  K extends keyof V[number] = keyof V[number],
>(value: V, name: `[${number}].${string & K}`): V[number][K];
function getIn<
  V extends Record<string, any>,
  K extends keyof V = keyof V,
  KK extends keyof V[K] = keyof V[K],
>(value: V, name: `${string & K}.${string & KK}`): V[K][KK];
function getIn<
  V extends any[],
  K extends keyof V[number] = keyof V[number],
>(value: V, name: `[${number}].${string & K}`): V[number][K];
function getIn<V extends Record<string | number, any>>() {}

type AAA = { d: number }[];
const aaa: AAA = [];

type bfg = keyof AAA;

const ag = getIn(aaa, '[1].d');

type a = {
  b: number;
  c: ({ d: number; e: number } | undefined);
  m: { P: string }[] | null;
};

const A: a = { b: 22, c: { d: 33, e: 1 }, m: [] };

const sss = getIn(A, "c.e");

export default getIn;
