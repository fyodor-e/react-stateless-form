import { FieldError, FormControl } from "../formControl";
import { expectType, FormTouched } from "..";

type Values = {
  p: "p" | "c";
  arr: {
    prop2: number;
  }[];
};

const rffFormControl: FormControl<Values> = {
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

rffFormControl.setFieldValue("p", "c");
rffFormControl.setFieldValue("p", (prev) => {
  expectType<Values["p"], typeof prev>(prev);
  return prev;
});

rffFormControl.setFieldValue("arr.1", { prop2: 12 });
rffFormControl.setFieldValue("arr.1", (prev) => {
  expectType<Values["arr"][number], typeof prev>(prev);
  return prev;
});

rffFormControl.setFieldError("arr", { message: "error" });
rffFormControl.setFieldError("arr", (prev) => {
  expectType<
    FieldError | ({ prop2?: FieldError | undefined } | undefined)[] | undefined,
    typeof prev
  >(prev);
  return prev;
});

rffFormControl.setFieldTouched("arr.1", { prop2: false });
rffFormControl.setFieldTouched("arr", (prev) => {
  expectType<FormTouched<Values["arr"]> | undefined, typeof prev>(prev);
  return prev;
});

rffFormControl.setFieldDirty("arr.1", { prop2: false });
rffFormControl.setFieldDirty("arr", (prev) => {
  expectType<FormTouched<Values["arr"]> | undefined, typeof prev>(prev);
  return prev;
});
