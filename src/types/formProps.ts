import { FormErrors, FormControl, FormTouched, DeepPick, KeyPaths } from "./";
import { SetStateAction } from "react";
import { Resolver } from "../useForm/resolver";

export type ValueFunction<V extends {}> = (v: V) => void;
export type FunctionValueFunction<V extends {}> = (
  v: SetStateAction<V>,
) => void;

export type OnSubmit<Values extends object, SubmitProps = undefined> = (arg: {
  formControl: Omit<FormControl<Values>, "handleSubmit">;
  submitProps: SubmitProps;
}) => Promise<void> | void;

export type FormSubmitCreatorArg<
  Values extends object,
  SubmitProps = undefined,
> = {
  formControl: Omit<FormControl<Values>, "handleSubmit">;
  validator?: (
    formControl: Omit<FormControl<Values>, "handleSubmit">,
  ) => Promise<FormErrors<Values>>;
  onSubmit?: OnSubmit<Values, SubmitProps>;
  setSubmitCount: (submitCount: number) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export type FormProps<Values extends object, SubmitProps = undefined> = {
  onSubmit?: OnSubmit<Values, SubmitProps>;

  formSubmitCreator?: (
    arg: FormSubmitCreatorArg<Values, SubmitProps>,
  ) => undefined extends SubmitProps & undefined
    ? () => Promise<void>
    : (submitProps: SubmitProps) => Promise<void>;

  useValidate?: (arg: {
    formControl: Omit<FormControl<Values>, "handleSubmit">;
    resolver?: Resolver<Values>;
    context?: any;
    criteriaMode?: "all" | "firstError";
  }) => () => Promise<FormErrors<Values>>;
  context?: any;
  criteriaMode?: "all" | "firstError";
  resolver?: Resolver<Values>;

  submitCount?: number;
  setSubmitCount?: (submitCount: number) => void;

  isSubmitting?: boolean;
  setIsSubmitting?: (isSubmitting: boolean) => void;

  initialValues?: Values;
  values: Values;
  setFieldValue?: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
    name: Name;
    value: DeepPick<Values, Name>;
  }) => void;
} & (
  | {
      errors?: FormErrors<Values>;
      setFieldError?: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
        name: Name;
        error: DeepPick<FormErrors<Values>, Name>;
      }) => void;
    }
  | {
      errors: FormErrors<Values>;
      setFieldError: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
        name: Name;
        error: DeepPick<FormErrors<Values>, Name>;
      }) => void;
    }
) &
  (
    | {
        touched?: FormTouched<Values>;
        setFieldTouched?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          touched: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }
    | {
        touched: FormTouched<Values>;
        setFieldTouched: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          touched: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }
  ) &
  (
    | {
        dirty?: FormTouched<Values>;
        setFieldDirty?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          dirty: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }
    | {
        dirty: FormTouched<Values>;
        setFieldDirty: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          dirty: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }
  );
