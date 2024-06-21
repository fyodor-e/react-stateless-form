import { Increment } from "./increment";

export type CheckUndefined<
  T,
  IsUndefined extends boolean,
> = undefined extends T & undefined
  ? true
  : [NonNullable<T>] extends [UnionToIntersection<NonNullable<T>>]
    ? IsUndefined
    : true;

export type CheckNull<T, IsNull extends boolean> = null extends T & null
  ? true
  : IsNull;

export type SetNullUndefined<
  T,
  IsNull extends boolean,
  IsUndefined extends boolean,
> = IsNull extends true
  ? IsUndefined extends true
    ? T | null | undefined
    : T | null
  : IsUndefined extends true
    ? T | undefined
    : T;

// number literal (i.e. '1') is converted to number, string literal (i.e. 'prop') is left unchanged
type GetKey<T> = T extends `${infer N extends number}` ? N : T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type SingleDeepPick<
  T,
  P,
  IsNull extends boolean,
  IsUndefined extends boolean,
  Iteration extends number = 0,
  Intersection = UnionToIntersection<Extract<NonNullable<T>, object>>,
  ArrayT = Extract<T, Array<any>>,
> = Iteration extends 500
  ? never
  : P extends `[${number}].${infer R}`
    ? ArrayT extends (infer A)[]
      ? SingleDeepPick<
          A,
          R,
          CheckNull<T, IsNull>,
          CheckUndefined<T, IsUndefined>,
          Increment<Iteration>
        >
      : unknown
    : P extends `${infer K}.${infer R}`
      ? K extends `${infer KK}[${infer I}]`
        ? GetKey<KK> extends keyof Intersection
          ? SingleDeepPick<
              Intersection[GetKey<KK>],
              `[${I}].${R}`,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined>,
              Increment<Iteration>
            >
          : unknown
        : GetKey<K> extends keyof Intersection
          ? SingleDeepPick<
              Intersection[GetKey<K>],
              R,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined>,
              Increment<Iteration>
            >
          : unknown
      : P extends `[${number}]`
        ? ArrayT extends (infer A)[]
          ? SetNullUndefined<
              A,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined>
            >
          : unknown
        : P extends `${infer K}[${infer I}]`
          ? GetKey<K> extends keyof Intersection
            ? SingleDeepPick<
                Intersection[GetKey<K>],
                `[${I}]`,
                CheckNull<T, IsNull>,
                CheckUndefined<T, IsUndefined>,
                Increment<Iteration>
              >
            : unknown
          : GetKey<P> extends keyof Intersection
            ? SetNullUndefined<
                Intersection[GetKey<P>],
                CheckNull<T, IsNull>,
                CheckUndefined<T, IsUndefined>
              >
            : unknown;

export type DeepPick<T, P> =
  // First step is check for any. Any cannot be processed correctly
  0 extends 1 & T
    ? any
    : (
          P extends unknown
            ? (k: SingleDeepPick<T, P, false, false>) => void
            : never
        ) extends (k: infer I) => void
      ? I
      : never;
