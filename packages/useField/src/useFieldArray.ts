import {
  ArrayKeyPaths,
  DeepPick,
  FormControl,
} from "@react-stateless-form/types";
import { getIn } from "@react-stateless-form/utils";
import { useCallback } from "react";

const useFieldArray = <
  Values extends object,
  Name extends ArrayKeyPaths<Values> = ArrayKeyPaths<Values>,
  ArrType = DeepPick<Values, Name> extends (infer A)[] ? A : never,
>({
  formControl: { values, setFieldValue },
  name,
}: {
  formControl: FormControl<Values>;
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
  const arr = getIn<any, string>({ values, name });

  const append = useCallback(
    (element: any) => {
      if (!Array.isArray(arr)) return;
      (setFieldValue as any)({ name, value: [...arr, element] });
    },
    [arr, setFieldValue],
  );

  const prepend = useCallback(
    (element: any) => {
      if (!Array.isArray(arr)) return;
      (setFieldValue as any)({ name, value: [element, ...arr] });
    },
    [arr, setFieldValue],
  );

  const insert = useCallback(
    (index: number, element: ArrType) => {
      if (!Array.isArray(arr) || index < 0) return;
      const newArr = [...arr];

      if (index > newArr.length) {
        newArr.push(...new Array(index - newArr.length).fill(undefined));
      }

      (setFieldValue as any)({
        name,
        value: [...newArr.slice(0, index), element, ...newArr.slice(index)],
      });
    },
    [arr, setFieldValue],
  );

  const swap = useCallback(
    (from: number, to: number) => {
      if (
        !Array.isArray(arr) ||
        from < 0 ||
        to < 0 ||
        from >= arr.length ||
        to >= arr.length
      )
        return;

      const idx1 = Math.min(from, to);
      const idx2 = Math.max(from, to);

      (setFieldValue as any)({
        name,
        value: [
          ...arr.slice(0, idx1),
          arr[idx2],
          ...arr.slice(idx1 + 1, idx2),
          arr[idx1],
          ...arr.slice(idx2 + 1),
        ],
      });
    },
    [arr, setFieldValue],
  );

  const move = useCallback(
    (from: number, to: number) => {
      if (
        !Array.isArray(arr) ||
        from < 0 ||
        to < 0 ||
        from >= arr.length ||
        to >= arr.length
      )
        return;

      const newArr = [...arr.slice(0, from), ...arr.slice(from + 1)];

      (setFieldValue as any)({
        name,
        value: [...newArr.slice(0, to), arr[from], ...newArr.slice(to)],
      });
    },
    [arr, setFieldValue],
  );

  const update = useCallback(
    (index: number, element: ArrType) => {
      if (!Array.isArray(arr) || index < 0 || index >= arr.length) return;
      (setFieldValue as any)({
        name,
        value: [...arr.slice(0, index), element, ...arr.slice(index + 1)],
      });
    },
    [arr, setFieldValue],
  );

  const replace = useCallback(
    (elements: ArrType[]) => {
      if (!Array.isArray(arr)) return;
      (setFieldValue as any)({ name, value: elements });
    },
    [arr, setFieldValue],
  );

  const remove = useCallback(
    (...indexes: number[]) => {
      if (!Array.isArray(arr)) return;
      const newArr = arr.reduce((res, element, index) => {
        if (!indexes.includes(index)) res.push(element);
        return res;
      }, []);
      (setFieldValue as any)({ name, value: newArr });
    },
    [arr, setFieldValue],
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

export default useFieldArray;
