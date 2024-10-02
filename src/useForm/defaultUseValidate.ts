import { FormControl, FormErrors } from "../types";
import { useCallback, useEffect } from "react";
import { Resolver } from "./resolver";

export const defaultUseValidate = ({
  formControl: { values, setFieldError },
  resolver,
  context,
  criteriaMode,
}: {
  formControl: Omit<FormControl<any>, "handleSubmit">;
  resolver?: Resolver<any>;
  context?: any;
  criteriaMode: "all" | "firstError";
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
  }, [resolver, context, values]);

  useEffect(() => {
    (async () => {
      const newErrors = await validator();
      setFieldError({ name: "", error: newErrors });
    })();
  }, [validator, setFieldError]);

  return validator;
};
