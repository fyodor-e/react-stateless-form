import { DefaultConvertFunction } from "@react-stateless-form/types";
import { getIn } from "@react-stateless-form/utils";
import { useMemo } from "react";

export const useDefaultConvertFunction: DefaultConvertFunction = ({
  rsfName: name,
  formControl: { values, errors, touched, setFieldTouched, setFieldValue },
}) => {
  const value = getIn({ values, name });
  const error = getIn({ values: errors, name });
  const fieldError = typeof error === "string" ? error : undefined;
  const fieldTouched = !!getIn({ values: touched, name });

  return useMemo(() => {
    return {
      value,
      error: fieldError,
      touched: fieldTouched,
      onBlur: () => setFieldTouched({ name }),
      onChange: ({ target: { value } }) => setFieldValue({ name, value }),
    };
  }, [name, value, fieldError, fieldTouched, setFieldTouched, setFieldValue]);
};
