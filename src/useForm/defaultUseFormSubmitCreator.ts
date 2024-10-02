import { useCallback } from "react";
import { UseFormSubmitCreatorArg } from "../types";
import { deepSetTouched } from "../utils";

export const defaultUseFormSubmitCreator = ({
  formControl,
  validator,
  onSubmit,
  setSubmitCount,
  setIsSubmitting,
}: UseFormSubmitCreatorArg<any, any>) =>
  useCallback(
    async (submitProps?: any) => {
      setSubmitCount(formControl.submitCount + 1);
      setIsSubmitting(true);

      try {
        // Set all fields to touched
        formControl.setFieldTouched({
          name: "",
          touched: deepSetTouched(formControl.values),
        });

        let errors = formControl.errors;
        // If validator is passed - use it to validate form and set errors
        if (validator) {
          errors = await validator(formControl);
          formControl.setFieldError({ name: "" as any, error: errors as any });
        }

        // Submit form only if there are no errors after validation
        if (Object.keys(errors).length === 0 && onSubmit) {
          await onSubmit({ formControl, submitProps });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [formControl, validator, onSubmit, setSubmitCount, setIsSubmitting],
  );
