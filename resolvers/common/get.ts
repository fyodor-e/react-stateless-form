import { isNullOrUndefined, isObjectType } from "./toNestErrors";

export default <T>(obj: T, path: string, defaultValue?: unknown): any => {
  if (!path || !isObjectType(obj)) {
    return defaultValue;
  }

  const result = path
    .split(/[,[\].]+?/)
    .filter(Boolean)
    .reduce(
      (result, key) =>
        isNullOrUndefined(result) ? result : result[key as keyof {}],
      obj
    );

  return result === undefined || result === obj
    ? obj[path as keyof T] === undefined
      ? defaultValue
      : obj[path as keyof T]
    : result;
};
