export const deepEqual = (a: any, b: any): boolean => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((elemA, index) => deepEqual(elemA, b[index]));
  }

  if (
    typeof a === "object" &&
    a != null &&
    typeof b === "object" &&
    b != null
  ) {
    if (Object.keys(a).length !== Object.keys(b).length) return false;

    return Object.keys(a).every((keyA) => deepEqual(a[keyA], b[keyA]));
  }

  return a === b;
};
