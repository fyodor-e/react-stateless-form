import { FormControl, FormErrors } from "../types";
import { useCallback, useEffect } from "react";
import { Resolver, ResolverResult } from "./resolver";

const defaultUseValidate = ({
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
      : ({} as ResolverResult<any>);
    return errors;
  }, [resolver, context, values]);

  useEffect(() => {
    (async () => {
      const error = await validator();
      setFieldError({ name: "", error });
    })();
  }, [validator, setFieldError]);

  return validator;
};

export default defaultUseValidate;
