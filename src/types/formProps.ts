import {
  FormErrors,
  FormControl,
  FormTouched,
  DeepPick,
  KeyPaths,
  SetterOrValue,
} from "./";
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

export type UseFormSubmitCreatorArg<
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

export type SetField<Values> = <
  Name extends KeyPaths<Values> = KeyPaths<Values>,
>(
  name: Name,
  value: SetterOrValue<DeepPick<Values, Name>>,
) => void;

export type FormProps<Values extends object, SubmitProps = undefined> = {
  onSubmit?: OnSubmit<Values, SubmitProps>;

  useFormSubmitCreator?: (
    arg: UseFormSubmitCreatorArg<Values, SubmitProps>,
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

  useDirty?: (arg: {
    formControl: Omit<FormControl<Values>, "handleSubmit">;
    initialValues: Values | undefined;
  }) => void;

  useInitialValues?: (arg: {
    formControl: Omit<FormControl<Values>, "handleSubmit">;
    initialValues: Values | undefined;
  }) => Values | undefined;

  submitCount?: number;
  setSubmitCount?: (submitCount: number) => void;

  isSubmitting?: boolean;
  setIsSubmitting?: (isSubmitting: boolean) => void;

  initialValues?: Values;
  values: Values;
  setFieldValue?: SetField<Values>;
} & (
  | {
      errors?: FormErrors<Values>;
      setFieldError?: undefined;
    }
  | {
      errors: FormErrors<Values>;
      setFieldError: SetField<FormErrors<Values>>;
    }
) &
  (
    | {
        touched?: FormTouched<Values>;
        setFieldTouched?: undefined;
      }
    | {
        touched: FormTouched<Values>;
        setFieldTouched: SetField<FormTouched<Values>>;
      }
  ) &
  (
    | {
        dirty?: FormTouched<Values>;
        setFieldDirty?: undefined;
      }
    | {
        dirty: FormTouched<Values>;
        setFieldDirty: SetField<FormTouched<Values>>;
      }
  );
