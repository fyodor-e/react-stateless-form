type GenNode<
  K extends string | number,
  IsRoot extends boolean,
> = IsRoot extends true
  ? `${K}` | (K extends number ? `[${K}]` : never)
  : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

type KeyPaths<
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

export default KeyPaths;

// type GenNode<
//   K extends string | number,
//   IsRoot extends boolean,
// > = IsRoot extends true
//   ? `${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never)
//   : `.${K}` | (K extends number ? `[${K}]` | `.[${K}]` : never);

// type KeyPaths<
//   T,
//   IsRoot extends boolean = true,
//   K extends keyof T = keyof T,
// > = K extends string | number
//   ?
//       | GenNode<K, IsRoot>
//       | (T[K] extends (infer A)[]
//           ? `${GenNode<number, IsRoot>}${KeyPaths<A, false>}`
//           : T[K] extends object
//             ? `${GenNode<K, IsRoot>}${KeyPaths<T[K], false>}`
//             : never)
//   : never;

// export default KeyPaths;

// type ExcludeArrayKey<T> = Exclude<keyof T & string, keyof Array<any> & string>;

// type ObjectKeyPathsInternal<
//   T extends object,
//   G extends keyof T = keyof T
// > = G extends string
//   ? T[G] extends readonly any[]
//     ?
//         | `${G}${
//             | `[${ExcludeArrayKey<T[G]>}]`
//             | `.${ObjectKeyPathsInternal<T[G]>}`
//             | `.[${ObjectKeyPathsInternal<T[G]>}]`}`
//     : T[G] extends Record<string, any>
//     ? `${G}${`.${ObjectKeyPathsInternal<T[G]>}`}`
//      | `${G}.${keyof T[G] & string}`
//     : G
//   : never;

//   type KeyPaths<T extends object> = ObjectKeyPathsInternal<T> | keyof T;

//   export default KeyPaths
