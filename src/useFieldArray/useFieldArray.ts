import { FormControl, ArrayKeyPaths, DeepPick } from "../types";
import { useCallback } from "react";

export const useFieldArray = <
  Values extends object,
  Name extends ArrayKeyPaths<Values> = ArrayKeyPaths<Values>,
  Value = DeepPick<Values, Name>,
  ArrType = Value extends (infer A)[] ? A : never,
>({
  rsfFormControl: { values, setFieldValue },
  name,
}: {
  rsfFormControl: FormControl<Values>;
  name: Name;
}): {
  append: (element: ArrType) => void;
  prepend: (element: ArrType) => void;
  insert: (index: number, element: ArrType) => void;
  swap: (from: number, to: number) => void;
  move: (from: number, to: number) => void;
  update: (index: number, element: ArrType) => void;
  replace: (elemets: ArrType[]) => void;
  remove: (...index: number[]) => void;
} => {
  const append = useCallback(
    (element: any) => {
      setFieldValue(name as any, (arr: any[]) =>
        Array.isArray(arr) ? [...arr, element] : arr,
      );
    },
    [setFieldValue],
  );

  const prepend = useCallback(
    (element: any) => {
      setFieldValue(name as any, (arr: any[]) =>
        Array.isArray(arr) ? [element, ...arr] : arr,
      );
    },
    [setFieldValue],
  );

  const insert = useCallback(
    (index: number, element: ArrType) => {
      setFieldValue(name as any, (arr: any[]) => {
        if (!Array.isArray(arr) || index < 0) return arr;
        const newArr = [...arr];

        if (index > newArr.length) {
          newArr.push(...new Array(index - newArr.length).fill(undefined));
        }

        return [...newArr.slice(0, index), element, ...newArr.slice(index)];
      });
    },
    [setFieldValue],
  );

  const swap = useCallback(
    (from: number, to: number) => {
      setFieldValue(name as any, (arr: any[]) => {
        if (
          !Array.isArray(arr) ||
          from < 0 ||
          to < 0 ||
          from >= arr.length ||
          to >= arr.length
        )
          return arr;

        const idx1 = Math.min(from, to);
        const idx2 = Math.max(from, to);

        return [
          ...arr.slice(0, idx1),
          arr[idx2],
          ...arr.slice(idx1 + 1, idx2),
          arr[idx1],
          ...arr.slice(idx2 + 1),
        ];
      });
    },
    [setFieldValue],
  );

  const move = useCallback(
    (from: number, to: number) => {
      setFieldValue(name as any, (arr: any[]) => {
        if (
          !Array.isArray(arr) ||
          from < 0 ||
          to < 0 ||
          from >= arr.length ||
          to >= arr.length
        )
          return arr;

        const newArr = [...arr.slice(0, from), ...arr.slice(from + 1)];

        return [...newArr.slice(0, to), arr[from], ...newArr.slice(to)];
      });
    },
    [setFieldValue],
  );

  const update = useCallback(
    (index: number, element: ArrType) => {
      setFieldValue(name as any, (arr: any[]) => {
        if (!Array.isArray(arr) || index < 0 || index >= arr.length) return arr;
        return [...arr.slice(0, index), element, ...arr.slice(index + 1)];
      });
    },
    [setFieldValue],
  );

  const replace = useCallback(
    (elements: ArrType[]) => {
      setFieldValue(name as any, elements);
    },
    [setFieldValue],
  );

  const remove = useCallback(
    (...indexes: number[]) => {
      setFieldValue(name as any, (arr: any[]) => {
        if (!Array.isArray(arr)) return arr;
        const newArr = arr.reduce((res, element, index) => {
          if (!indexes.includes(index)) res.push(element);
          return res;
        }, []);

        return newArr;
      });
    },
    [setFieldValue],
  );

  return {
    append,
    prepend,
    insert,
    swap,
    move,
    update,
    replace,
    remove,
  };
};
