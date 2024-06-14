export type FormTouched<V> =
  // Check for V = any
  0 extends 1 & V
    ? any
    : {
        [K in keyof NonNullable<V>]?: NonNullable<
          NonNullable<V>[K]
        > extends (infer A)[]
          ? FormTouched<A>[]
          : NonNullable<NonNullable<V>[K]> extends object
            ? FormTouched<NonNullable<NonNullable<V>[K]>>
            : boolean;
      };
