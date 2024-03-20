type GenNode<
  K extends string | number,
  IsRoot extends boolean,
> = IsRoot extends true
  ? `${K}` | (K extends number ? `[${K}]` : never)
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

export type KeyPaths<
  V extends any,
  IsRoot extends boolean = true,
  O extends Exclude<Extract<V, object>, Array<any>> = Exclude<
    Extract<V, object>,
    Array<any>
  >,
  K extends keyof O = keyof O,
> =
  Extract<V, object> extends never
    ? never
    :
        | (Extract<V, Array<any>> extends never
            ? never
            :
                | GenNode<number, IsRoot>
                | `${GenNode<number, IsRoot>}${KeyPaths<Extract<V, Array<any>>[number], false>}`)
        | (O extends never
            ? never
            : K extends string | number
              ?
                  | GenNode<K, IsRoot>
                  | `${GenNode<K, IsRoot>}${KeyPaths<O[K], false>}`
              : never);
