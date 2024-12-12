import { FieldError, FormControl } from "../formControl";
import { expectType, FormTouched } from "..";

type Values = {
  p: "p" | "c";
  arr: {
    prop2: number;
  }[];
};

const rsfFormControl: FormControl<Values> = {
  values: { p: "p", arr: [] },
  errors: {},
  touched: {},
  dirty: {},
  setFieldValue: () => {},
  setFieldTouched: () => {},
  setFieldError: () => {},
  setFieldDirty: () => {},
  submitCount: 0,
  isSubmitting: false,
  setIsSubmitting: () => {},
  isLoading: false,
  setIsLoading: () => {},
  isValid: true,
  handleSubmit: () => Promise.resolve(),
};

rsfFormControl.setFieldValue("p", "c");
rsfFormControl.setFieldValue("p", (prev) => {
  expectType<Values["p"], typeof prev>(prev);
  return prev;
});

rsfFormControl.setFieldValue("arr.1", { prop2: 12 });
rsfFormControl.setFieldValue("arr.1", (prev) => {
  expectType<Values["arr"][number], typeof prev>(prev);
  return prev;
});

rsfFormControl.setFieldError("arr", { message: "error" });
rsfFormControl.setFieldError("arr", (prev) => {
  expectType<
    FieldError | ({ prop2?: FieldError | undefined } | undefined)[] | undefined,
    typeof prev
  >(prev);
  return prev;
});

rsfFormControl.setFieldTouched("arr.1", { prop2: false });
rsfFormControl.setFieldTouched("arr", (prev) => {
  expectType<FormTouched<Values["arr"]> | undefined, typeof prev>(prev);
  return prev;
});

rsfFormControl.setFieldDirty("arr.1", { prop2: false });
rsfFormControl.setFieldDirty("arr", (prev) => {
  expectType<FormTouched<Values["arr"]> | undefined, typeof prev>(prev);
  return prev;
});
