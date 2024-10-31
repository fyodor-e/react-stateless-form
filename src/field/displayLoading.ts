import { FormControl } from "../types";

export type DisplayLoading = (props: {
  rsfName: string;
  formControl: Omit<FormControl<any>, "handleSubmit">;
}) => boolean;

export type DefaultDisplayLoading = (props: {
  rsfName: string;
  formControl: Pick<FormControl<any>, "values">;
}) => boolean;
