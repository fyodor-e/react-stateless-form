import { UseInitialValues } from "../types";
import { useEffect, useState } from "react";

export const defaultUseInitialValues: UseInitialValues<any> = ({
  initialValues: initialValuesFromProps,
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
