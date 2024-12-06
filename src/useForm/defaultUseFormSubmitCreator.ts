import { useCallback } from "react";
import { UseFormSubmitCreator } from "../types";
import { deepSetTouched } from "../utils";

export const defaultUseFormSubmitCreator: UseFormSubmitCreator<
  any,
  any,
  any
> = ({
  rsfFormControl,
  validator,
  onSubmit,
  setSubmitCount,
  setIsSubmitting,
}) =>
  useCallback(
    async (submitProps?: any) => {
      setSubmitCount(rsfFormControl.submitCount + 1);
      setIsSubmitting(true);

      // Set all fields to touched
      rsfFormControl.setFieldTouched("", deepSetTouched(rsfFormControl.values));

      let errors = rsfFormControl.errors;
      // If validator is passed - use it to validate form and set errors
      if (validator) {
        errors = await validator(rsfFormControl);
        rsfFormControl.setFieldError("", errors);
      }

      // Submit form only if there are no errors after validation
      if (Object.keys(errors).length === 0 && onSubmit) {
        return await onSubmit({ rsfFormControl, submitProps });
      }
    },
    [rsfFormControl, validator, onSubmit, setSubmitCount, setIsSubmitting],
  );
