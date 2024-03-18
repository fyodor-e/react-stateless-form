import { KeyPaths, DeepPick } from "@react-stateless-form/types";

export const getIn = <
  Values extends {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>(
  obj: Values,
  key: Name,
): DeepPick<Values, Name> => {
  // Remove leading square bracket
  // For situation like [0].prop
  if (key[0] === "[") {
    key = key.slice(1) as any;
  }

  const path = key
    .replaceAll("]", "")
    .replaceAll("[", ".")
    .replaceAll("..", ".")
    .split(".");
  // TS cannot follow all the logic below to check return type validity
  // So cast to any
  let res: any = obj;
  for (let p = 0; res && p < path.length; p++) {
    res = res[path[p]];
  }
  return res;
};
