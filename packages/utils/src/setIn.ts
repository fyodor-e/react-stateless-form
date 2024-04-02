import { KeyPaths, DeepPick } from "@react-stateless-form/types";
import { getIn } from "./getIn";

export const setIn = <
  Values extends {},
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>({
  values,
  name,
  value,
}: {
  values: Values;
  name: Name;
  value: DeepPick<Values, Name>;
}): Values => {
  const prevValue = getIn({ values, name });
  if (prevValue === value) return values;

  // Implement me!
  return values;
};
