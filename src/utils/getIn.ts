import { KeyPaths, DeepPick } from "../types";
import { prepareName } from "./prepareName";

export const getIn = <
  Values extends {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>({
  values,
  name,
}: {
  values: Values;
  name: Name;
}): DeepPick<Values, Name> => {
  const path = prepareName(name).split(".");

  // TS cannot follow all the logic below to check return type validity
  // So cast to any
  let res: any = values;
  for (let p = 0; res && p < path.length; p++) {
    res = res[path[p]];
  }
  return res;
};
