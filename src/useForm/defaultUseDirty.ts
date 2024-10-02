import { useEffect } from "react";
import { FormControl } from "../types";
import { deepDirty, isChanged } from "../utils";

export const defaultUseDirty = ({
  formControl: { setFieldDirty, values, dirty },
  initialValues,
}: {
  formControl: Omit<FormControl<any>, "handleSubmit">;
  initialValues: any;
}) => {
  useEffect(() => {
    const newDirty = deepDirty(initialValues, values);
    if (isChanged(dirty, newDirty))
      setFieldDirty({
        name: "" as any,
        dirty: newDirty,
      });
  }, [values, setFieldDirty, initialValues]);
};
