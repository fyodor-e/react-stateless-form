import { KeyPaths, FormControl } from "@react-stateless-form/types";

export type DisplayLoading<Values extends object> = (props: {
  rsfName: KeyPaths<Values>;
  formControl: FormControl<Values>;
}) => boolean;

export type DefaultDisplayLoading = (props: {
  rsfName: string;
  formControl: Pick<FormControl<any>, "values">;
}) => boolean;
