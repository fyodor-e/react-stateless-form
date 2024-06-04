import { KeyPaths, DeepPick } from "@react-stateless-form/types";
import { getIn } from "./getIn";
import { prepareName } from "./prepareName";

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

  const path = prepareName(name).split(".");

  return values;
};

const setInInternal = ({
  values,
  path,
  value,
}: {
  values: any;
  path: string[];
  value: any;
}): any => {
  if (path.length === 1) {
    return {
      ...values,
      [path[0]]: value,
    };
  }

  let newValues = values[path[0]];
  if (newValues == null) {
    newValues = typeof path[1] === "number" ? [] : {};
  }

  // What to do if newValues is primitive, i.e. string, number or boolean?

  return {
    ...values,
    [path[0]]: setInInternal({
      values: newValues,
      path: path.slice(1),
      value,
    }),
  };
};
