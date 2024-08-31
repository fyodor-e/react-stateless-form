import { DefaultDisplayLoading } from "@react-stateless-form/types";
import { getIn } from "@react-stateless-form/utils";

export const defaultDisplayLoading: DefaultDisplayLoading = ({
  formControl: { values },
  rsfName: name,
}) => getIn({ values, name }) === undefined;
