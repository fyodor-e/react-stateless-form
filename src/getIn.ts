type V = Record<string | number, any>;

type K = keyof V;

type S = `${K}`;

function getIn<
  V extends Record<string, any>,
  K extends keyof V = keyof V,
>(value: V, name: K): V[K];
function getIn<
  V extends Record<string, any>,
  K extends keyof V = keyof V,
  KK extends keyof V[K] = keyof V[K],
>(value: V, name: `${string & K}.${string & KK}`): V[K][KK];
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
>(value: V, name: `${number}`): V[number];

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

type AAA = { l: number }[];
const aaa: AAA = [];

type bfg = keyof AAA;

const ag = getIn(aaa, "1.l");

type a = {
  b: number;
  c: { d: number; e: number };
  m: { P: string }[];
};

const A: a = { b: 22, c: { d: 33, e: 1 }, m: [] };

const sss = getIn(A, "m.1");

export default getIn;
