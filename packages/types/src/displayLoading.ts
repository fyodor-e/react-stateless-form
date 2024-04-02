import { KeyPaths, FormContext } from "@react-stateless-form/types";

export type DisplayLoading<Values extends {}> = (
  props: {
    rsfName: KeyPaths<Values>;
  } & FormContext<Values>,
) => boolean;

export type DefaultDisplayLoading = (
  props: {
    rsfName: string;
  } & Pick<FormContext<any>, "values">,
) => boolean;
