import { KeyPaths, FormState } from "@react-stateless-form/types";

export type DisplayLoading<Values extends {}> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormState<Values>,
) => boolean;

export type DefaultDisplayLoading = (
  props: {
    rsfName: string;
  } & Pick<FormState<any>, "values">,
) => boolean;
