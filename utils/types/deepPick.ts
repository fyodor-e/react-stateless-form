type SingleDeepPick<T, P> = P extends `[${number}].${infer R}`
  ? T extends (infer A)[]
    ? SingleDeepPick<A, R>
    : unknown
  : P extends `${number}.${infer R}`
    ? T extends (infer A)[]
      ? SingleDeepPick<A, R>
      : unknown
    : P extends `${infer K}[${number}].${infer R}`
      ? K extends keyof T
        ? SingleDeepPick<T[K], `[${number}].${R}`>
        : unknown
      : P extends `${infer K}.${infer R}`
        ? K extends keyof T
          ? SingleDeepPick<T[K], R>
          : unknown
        : P extends `[${number}]`
          ? T extends (infer A)[]
            ? A
            : unknown
          : P extends `${number}`
            ? T extends (infer A)[]
              ? A
              : unknown
            : P extends `${infer K}[${number}]`
              ? K extends keyof T
                ? SingleDeepPick<T[K], `[${number}]`>
                : unknown
              : P extends keyof T
                ? T[P]
                : unknown;

type DeepPick<T, P> = (
  P extends unknown ? (k: SingleDeepPick<T, P>) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export default DeepPick;
