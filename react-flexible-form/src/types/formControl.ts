import { SetField } from "./formProps";
import { FormTouched } from "./formTouched";
import { SetterOrValue } from "./setterOrValue";

export type ValidateResult = string | string[] | boolean | undefined;

export type FieldError = {
  type?: string;
  types?: {
    [key: string]: ValidateResult;
  };
  message?: string;
};

export type FormErrors<V> =
  // Check for V = any
  0 extends 1 & V
    ? any
    : V extends object
      ? {
          [K in keyof V]?: V[K] extends (infer A)[]
            ? FieldError | (FormErrors<A> | undefined)[]
            : FieldError | FormErrors<V[K]>;
        }
      : FieldError;

export type FormControl<
  Values extends object,
  SubmitProps = undefined,
  SubmitReturn = void,
> = {
  values: Values;
  errors: FormErrors<Values>;
  touched: FormTouched<Values>;
  dirty: FormTouched<Values>;
  setFieldValue: SetField<Values>;
  setFieldError: SetField<FormErrors<Values>>;
  setFieldTouched: SetField<FormTouched<Values>>;
  setFieldDirty: SetField<FormTouched<Values>>;

  submitCount: number;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: SetterOrValue<boolean>) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: SetterOrValue<boolean>) => void;

  isValid: boolean;

  handleSubmit: undefined extends SubmitProps & undefined
    ? () => Promise<SubmitReturn>
    : (submitProps: SubmitProps) => Promise<SubmitReturn>;
};
