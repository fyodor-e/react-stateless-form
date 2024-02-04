import { FormControl } from "../types";

export type DisplayLoading = (props: {
  rsfName: string;
  rsfFormControl: Omit<FormControl<any>, "handleSubmit">;
}) => boolean;

export type DefaultDisplayLoading = (props: {
  rsfName: string;
  rsfFormControl: Pick<FormControl<any>, "values">;
}) => boolean;
