import { FormErrors, UseValidate } from "../types";
import { useCallback, useEffect } from "react";

export const defaultUseValidate: UseValidate<any> = ({
  rsfFormControl: { values, setFieldError },
  resolver,
  context,
  criteriaMode,
}): (() => Promise<FormErrors<any>>) => {
  const validator = useCallback(async () => {
    const { errors } = resolver
      ? await resolver(values, context, {
          criteriaMode,
          shouldUseNativeValidation: false,
          fields: {},
        })
      : { errors: {} };
    return errors;
  }, [resolver, context, values, criteriaMode]);

  useEffect(() => {
    (async () => {
      const newErrors = await validator();
      setFieldError("", newErrors);
    })();
  }, [validator, setFieldError]);

  return validator;
};
