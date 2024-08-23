import { FormControl, FormErrors } from "@react-stateless-form/types";
import { useCallback, useEffect } from "react";
import { Resolver, ResolverResult } from "./resolver";

const defaultUseValidate = ({
  formControl: { values, setErrors },
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
      : ({} as ResolverResult<any>);
    return errors;
  }, [resolver, context, values]);

  useEffect(() => {
    (async () => {
      const errors = await validator();
      setErrors(errors);
    })();
  }, [validator, setErrors]);

  return validator;
};

export default defaultUseValidate;
