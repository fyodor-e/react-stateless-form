export type CheckUndefined<
  T,
  IsUndefined extends boolean,
> = undefined extends T & undefined ? true : IsUndefined;
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

type SingleDeepPick<
  T,
  P,
  IsNull extends boolean,
  IsUndefined extends boolean,
> = P extends `[${number}].${infer R}`
  ? NonNullable<T> extends (infer A)[]
    ? SingleDeepPick<A, R, CheckNull<T, IsNull>, CheckUndefined<T, IsUndefined>>
    : unknown
  : P extends `${number}.${infer R}`
    ? NonNullable<T> extends (infer A)[]
      ? SingleDeepPick<
          A,
          R,
          CheckNull<T, IsNull>,
          CheckUndefined<T, IsUndefined>
        >
      : unknown
    : P extends `${infer K}.${infer R}`
      ? K extends `${infer KK}[${number}]`
        ? KK extends keyof NonNullable<T>
          ? SingleDeepPick<
              NonNullable<T>[KK],
              `[${number}].${R}`,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined>
            >
          : unknown
        : K extends keyof NonNullable<T>
          ? SingleDeepPick<
              NonNullable<T>[K],
              R,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined>
            >
          : unknown
      : P extends `[${number}]`
        ? NonNullable<T> extends (infer A)[]
          ? SetNullUndefined<
              A,
              CheckNull<T, IsNull>,
              CheckUndefined<T, IsUndefined>
            >
          : unknown
        : P extends `${number}`
          ? NonNullable<T> extends (infer A)[]
            ? SetNullUndefined<
                A,
                CheckNull<T, IsNull>,
                CheckUndefined<T, IsUndefined>
              >
            : unknown
          : P extends `${infer K}[${number}]`
            ? K extends keyof NonNullable<T>
              ? SingleDeepPick<
                  NonNullable<T>[K],
                  `[${number}]`,
                  CheckNull<T, IsNull>,
                  CheckUndefined<T, IsUndefined>
                >
              : unknown
            : P extends keyof NonNullable<T>
              ? SetNullUndefined<
                  NonNullable<T>[P],
                  CheckNull<T, IsNull>,
                  CheckUndefined<T, IsUndefined>
                >
              : unknown;

type DeepPick<T, P> = (
  P extends unknown ? (k: SingleDeepPick<T, P, false, false>) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export default DeepPick;
