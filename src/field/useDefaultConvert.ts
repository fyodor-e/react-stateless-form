import { DefaultConvertHook } from "@react-stateless-form/types";
import { getIn, getInErrors } from "@react-stateless-form/utils";
import { useMemo } from "react";

export const useDefaultConvert: DefaultConvertHook = ({
  rsfName: name,
  formControl: { values, errors, touched, setFieldTouched, setFieldValue },
}) => {
  const value = getIn({ values, name });
  const error = getInErrors<any, any>({ errors, name });
  const fieldError = error.length ? error.join(", ") : undefined;
  const fieldTouched = !!getIn({ values: touched, name });

  return useMemo(() => {
    return {
      value,
      error: fieldError,
      touched: fieldTouched,
      onBlur: () => setFieldTouched({ name, touched: true }),
      onChange: ({ target: { value } }) => setFieldValue({ name, value }),
    };
  }, [name, value, fieldError, fieldTouched, setFieldTouched, setFieldValue]);
};
