import { FormControl } from "../types";
import { useEffect, useState } from "react";

export const defaultUseInitialValues = ({
  initialValues: initialValuesFromProps,
}: {
  formControl: Omit<FormControl<any>, "handleSubmit">;
  initialValues: any | undefined;
}) => {
  const [initialValues, setInitialValues] = useState<any | undefined>(
    undefined,
  );

  useEffect(() => {
    // initialValues are set only once using provided initialValuesFromProps
    if (initialValuesFromProps && !initialValues) {
      setInitialValues(initialValuesFromProps);
    }
  }, [initialValuesFromProps]);

  return initialValues;
};
