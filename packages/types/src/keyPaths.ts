type GenNode<
  K extends string | number,
  IsRoot extends boolean,
> = IsRoot extends true
  ? `${K}` | (K extends number ? `[${K}]` : never)
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

export type KeyPaths<
  V extends any,
  IsRoot extends boolean = true,
  K extends keyof V = keyof V,
> = V extends (infer A)[]
  ? GenNode<number, IsRoot> | `${GenNode<number, IsRoot>}${KeyPaths<A, false>}`
  : V extends object
    ? K extends string | number
      ? GenNode<K, IsRoot> | `${GenNode<K, IsRoot>}${KeyPaths<V[K], false>}`
      : never
    : never;
