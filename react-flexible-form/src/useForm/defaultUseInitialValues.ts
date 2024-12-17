/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseInitialValues } from "../types";
import { useEffect, useState } from "react";

export const defaultUseInitialValues: UseInitialValues<any> = ({
  initialValues: initialValuesFromProps,
  formControl: { setFieldValue },
}) => {
  const [initialValues, setInitialValues] = useState<any>(
    initialValuesFromProps,
  );

  useEffect(() => {
    if (!initialValues && initialValuesFromProps) {
      setInitialValues(initialValuesFromProps);
      setFieldValue("", initialValuesFromProps);
    }
  }, [initialValuesFromProps]);

  return initialValues;
};
