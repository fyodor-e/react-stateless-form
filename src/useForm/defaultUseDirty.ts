import { useEffect } from "react";
import { FormControl } from "../types";
import { deepDirty } from "../utils";

export const defaultUseDirty = ({
  formControl: { setFieldDirty, values },
  initialValues,
}: {
  formControl: Omit<FormControl<any>, "handleSubmit">;
  initialValues: any;
}) => {
  useEffect(() => {
    const newDirty = deepDirty(initialValues, values);
    setFieldDirty("", newDirty);
  }, [values, setFieldDirty, initialValues]);
};
