import { UseInitialValues } from "../types";
import { useMemo } from "react";

export const defaultUseInitialValues: UseInitialValues<any> = ({
  initialValues: initialValuesFromProps,
  formControl: { values },
}) => useMemo(() => initialValuesFromProps || values, []);
