type V = Record<string | number, any>;

type K = keyof V;

type S = `${K}`;

function getIn<
  V extends Record<string, any>,
  K extends Extract<keyof V, string> = Extract<keyof V, string>,
>(value: V, name: K): V[K];
function getIn<
  V extends any[],
>(value: V, name: `${number}`): V[number];
function getIn<
  V extends Record<string, any>,
  K extends Extract<keyof V, string> = Extract<keyof V, string>,
  KK extends Extract<keyof V[K], string> = Extract<keyof V[K], string>,
>(value: V, name: `${K}.${KK}`): V[K][KK];
function getIn<
  V extends any[],
  KK extends Extract<keyof V[number], string> = Extract<keyof V[number], string>,
>(value: V, name: `${number}.${KK}`): V[number][KK];
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
