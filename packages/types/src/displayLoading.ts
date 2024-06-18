import { KeyPaths, FormControl } from "@react-stateless-form/types";

export type DisplayLoading = (props: {
  rsfName: string;
  formControl: FormControl<any>;
}) => boolean;

export type DefaultDisplayLoading = (props: {
  rsfName: string;
  formControl: Pick<FormControl<any>, "values">;
}) => boolean;
