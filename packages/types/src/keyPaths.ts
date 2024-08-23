import { Increment } from "./increment";
import { UnionToIntersection } from "./unionToIntersection";

type GenNode<
  K extends string | number,
  IsRoot extends boolean,
> = IsRoot extends true
  ? `${K}` | (K extends number ? `[${K}]` : never)
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

export type KeyPaths<
  V extends any,
  IsRoot extends boolean = true,
  Iteration extends number = 0,
  O extends UnionToIntersection<
    Exclude<Extract<V, object>, Array<any>>
  > = UnionToIntersection<Exclude<Extract<V, object>, Array<any>>>,
  K extends keyof O = keyof O,
> =
  // First step is check for any. Any cannot be processed correctly
  0 extends 1 & V
    ? string
    : // If iteration be more that 15 typescript stops processing
      Iteration extends 15
      ? never
      : Extract<V, object> extends never
        ? never
        :
            | (Extract<V, Array<any>> extends never
                ? never
                :
                    | GenNode<number, IsRoot>
                    | `${GenNode<number, IsRoot>}${KeyPaths<Extract<V, Array<any>>[number], false, Increment<Iteration>>}`)
            | (O extends never
                ? never
                : K extends string | number
                  ?
                      | GenNode<K, IsRoot>
                      | `${GenNode<K, IsRoot>}${KeyPaths<O[K], false, Increment<Iteration>>}`
                  : never);
