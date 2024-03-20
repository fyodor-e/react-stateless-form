export type CheckUndefined<
  T,
  IsUndefined extends boolean,
  IsArray extends boolean,
  IsObject extends boolean,
> = undefined extends T & undefined
  ? true
  : IsArray extends true
    ? Exclude<NonNullable<T>, Array<any>> extends never
      ? IsUndefined
      : true
    : IsObject extends true
      ?
          | ExtractArray<NonNullable<T>>
          | Exclude<NonNullable<T>, object> extends never
        ? IsUndefined
        : true
      : IsUndefined;

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

type O =
  | {
      prop1: "prop1";
    }
  | { prop2: "prop2" }[]
  | null
  | undefined
  | string[]
  | string
  | { p3: "a" };

type ExtractArray<A> = Extract<A, Array<any>>;
type ExtractObject<O, R = Extract<Exclude<O, Array<any>>, object>> = (
  R extends any ? (x: R) => void : never
) extends (x: infer I) => void
  ? I
  : never;

type SingleDeepPick<
  T,
  P,
  IsNull extends boolean,
  IsUndefined extends boolean,
  InputArray = ExtractArray<T>,
  InputObject = ExtractObject<T>,
> = P extends `[${number}].${infer R}`
  ? InputArray extends (infer A)[]
    ? SingleDeepPick<
        A,
        R,
        CheckNull<T, IsNull>,
        CheckUndefined<T, IsUndefined, true, false>
      >
    : unknown
  : P extends `${number}.${infer R}`
    ? ExtractArray<T> extends (infer A)[]
      ? SingleDeepPick<
          A,
          R,
          CheckNull<T, IsNull>,
          CheckUndefined<T, IsUndefined, true, false>
        >
      : unknown
    : P extends `${infer K}.${infer R}`
      ? K extends `${infer KK}[${number}]`
        ? KK extends keyof InputObject
          ? SingleDeepPick<
              InputObject[KK],
              `[${number}].${R}`,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined, false, true>
            >
          : unknown
        : K extends keyof InputObject
          ? SingleDeepPick<
              InputObject[K],
              R,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined, false, true>
            >
          : unknown
      : P extends `[${number}]`
        ? InputArray extends (infer A)[]
          ? SetNullUndefined<
              A,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined, true, false>
            >
          : unknown
        : P extends `${number}`
          ? InputArray extends (infer A)[]
            ? SetNullUndefined<
                A,
                CheckNull<T, IsNull>,
                CheckUndefined<T, IsUndefined, true, false>
              >
            : unknown
          : P extends `${infer K}[${number}]`
            ? K extends keyof InputObject
              ? SingleDeepPick<
                  InputObject[K],
                  `[${number}]`,
                  CheckNull<T, IsNull>,
                  CheckUndefined<T, IsUndefined, false, true>
                >
              : unknown
            : P extends keyof InputObject
              ? SetNullUndefined<
                  InputObject[P],
                  CheckNull<T, IsNull>,
                  CheckUndefined<T, IsUndefined, false, true>
                >
              : unknown;

export type DeepPick<T, P> = (
  P extends unknown ? (k: SingleDeepPick<T, P, false, false>) => void : never
) extends (k: infer I) => void
  ? I
  : never;
