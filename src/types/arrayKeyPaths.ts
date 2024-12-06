import { KeyPaths } from "./keyPaths";

type CombinePath<
  Prefix extends string,
  Postfix extends string | never,
> = Postfix extends string ? `${Prefix}${Postfix}` : never;

// type FilterArrayKeyPaths<Key extends string = string> =
//   Key extends `${infer Prefix}.[${number}].${infer Postfix}`
//     ?
//         | `${Prefix}`
//         | CombinePath<`${Prefix}.[${number}].`, FilterArrayKeyPaths<Postfix>>
//     : Key extends `${infer Prefix}[${number}].${infer Postfix}`
//       ?
//           | `${Prefix}`
//           | CombinePath<`${Prefix}[${number}].`, FilterArrayKeyPaths<Postfix>>
//       : Key extends `${infer Prefix}.${number}.${infer Postfix}`
//         ?
//             | `${Prefix}`
//             | CombinePath<`${Prefix}.${number}.`, FilterArrayKeyPaths<Postfix>>
//         : Key extends `${infer Prefix}.[${number}]`
//           ? Prefix
//           : Key extends `${infer Prefix}[${number}]`
//             ? Prefix
//             : Key extends `${infer Prefix}.${number}`
//               ? Prefix
//               : never;

type FilterArrayKeyPaths<Key extends string = string> =
  Key extends `${infer Prefix}.${number}.${infer Postfix}`
    ?
        | `${Prefix}`
        | CombinePath<`${Prefix}.${number}.`, FilterArrayKeyPaths<Postfix>>
    : Key extends `${infer Prefix}.${number}`
      ? Prefix
      : Key extends `${infer Prefix}.${infer Postfix}`
        ? CombinePath<`${Prefix}.`, FilterArrayKeyPaths<Postfix>>
        : never;

// type BB = 'obk.obj.1' extends `${infer Prefix}.${infer Postfix}` ? Prefix : never

export type ArrayKeyPaths<V extends any, Keys extends string = KeyPaths<V>> = {
  [Key in Keys]: FilterArrayKeyPaths<Key>;
}[Keys];
