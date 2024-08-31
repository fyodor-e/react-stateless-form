import { FormErrors, FormSubmitCreatorArg } from "../types";
import { deepSetTouched } from "../utils";

export const defaultFormSubmitter =
  <Values extends object, SubmitProps = undefined>({
    formControl,
    validator,
    onSubmit,
    setSubmitCount,
    setIsSubmitting,
  }: FormSubmitCreatorArg<Values, SubmitProps>) =>
  async (submitProps: SubmitProps) => {
    setSubmitCount(formControl.submitCount + 1);
    setIsSubmitting(true);

    try {
      // Set all fields to touched
      formControl.setFieldTouched({
        name: "" as any,
        touched: deepSetTouched(formControl.values) as any,
      });

      let errors: FormErrors<Values> = formControl.errors;
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
  };
