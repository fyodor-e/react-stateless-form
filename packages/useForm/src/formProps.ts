import {
  FormErrors,
  FormControl,
  FormTouched,
  DeepPick,
  KeyPaths,
} from "@react-stateless-form/types";
import { SetStateAction } from "react";
import { Resolver } from "./resolver";

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

export type FormProps<
  Values extends object,
  SetValues extends
    | ValueFunction<Values>
    | FunctionValueFunction<Values>
    | undefined = undefined,
  SetErrors extends
    | ValueFunction<FormErrors<Values>>
    | FunctionValueFunction<FormErrors<Values>>
    | undefined = undefined,
  SetTouched extends
    | ValueFunction<FormTouched<Values>>
    | FunctionValueFunction<FormTouched<Values>>
    | undefined = undefined,
  SetDirty extends
    | ValueFunction<FormTouched<Values>>
    | FunctionValueFunction<FormTouched<Values>>
    | undefined = undefined,
  SubmitProps = undefined,
> = {
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
  setValues?: SetValues;
} & (
  | {
      errors?: FormErrors<Values>;
      setErrors?: undefined;
    }
  | {
      errors: FormErrors<Values>;
      setErrors: NonNullable<SetErrors>;
    }
) &
  (
    | {
        touched?: FormTouched<Values>;
        setTouched?: undefined;
      }
    | {
        touched: FormTouched<Values>;
        setTouched: NonNullable<SetTouched>;
      }
  ) &
  (
    | {
        dirty?: FormTouched<Values>;
        setDirty?: undefined;
      }
    | {
        dirty: FormTouched<Values>;
        setDirty: NonNullable<SetDirty>;
      }
  ) &
  (SetValues extends FunctionValueFunction<Values> | undefined
    ? {
        setFieldValue?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          value: DeepPick<Values, Name>;
        }) => void;
      }
    : {
        setFieldValue: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          value: DeepPick<Values, Name>;
        }) => void;
      }) &
  (SetErrors extends FunctionValueFunction<FormErrors<Values>> | undefined
    ? {
        setFieldError?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          error: DeepPick<FormErrors<Values>, Name>;
        }) => void;
      }
    : {
        setFieldError: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          error: DeepPick<FormErrors<Values>, Name>;
        }) => void;
      }) &
  (SetTouched extends FunctionValueFunction<FormTouched<Values>> | undefined
    ? {
        setFieldTouched?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          touched: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }
    : {
        setFieldTouched: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          touched: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }) &
  (SetDirty extends FunctionValueFunction<FormTouched<Values>> | undefined
    ? {
        setFieldDirty?: <
          Name extends KeyPaths<Values> = KeyPaths<Values>,
        >(arg: {
          name: Name;
          dirty: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      }
    : {
        setFieldDirty: <Name extends KeyPaths<Values> = KeyPaths<Values>>(arg: {
          name: Name;
          dirty: DeepPick<FormTouched<Values>, Name>;
        }) => void;
      });
