import { useEffect } from "react";
import { UseDirty } from "../types";
import { deepDirty } from "../utils";

export const defaultUseDirty: UseDirty<any> = ({
  formControl: { setFieldDirty, values },
  initialValues,
}) => {
  useEffect(() => {
    const newDirty = deepDirty(initialValues, values);
    setFieldDirty("", newDirty);
  }, [values, setFieldDirty, initialValues]);
};
