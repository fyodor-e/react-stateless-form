import { KeyPaths, formControl } from "@react-stateless-form/types";

export type DisplayLoading<Values extends object> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormControl<Values>,
) => boolean;

export type DefaultDisplayLoading = (
  props: {
    rsfName: string;
  } & Pick<FormControl<any>, "values">,
) => boolean;
