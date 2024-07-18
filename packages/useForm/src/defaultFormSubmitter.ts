import { FormErrors } from "@react-stateless-form/types";
import { deepSetTouched } from "@react-stateless-form/utils";
import { FormProps, FormSubmitCreatorArg } from "./formProps";

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
      formControl.setTouched(deepSetTouched(formControl.values));

      let errors: FormErrors<Values> = formControl.errors;
      // If validator is passed - use it to validate form and set errors
      if (validator) {
        errors = await validator(formControl);
        formControl.setErrors(errors);
      }

      // Submit form only if there are no errors after validation
      if (Object.keys(errors).length === 0 && onSubmit) {
        await onSubmit({ formControl, submitProps });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
