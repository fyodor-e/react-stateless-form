import { DefaultDisplayLoading } from "../types/displayLoading";
import { getIn } from "../utils";

export const defaultDisplayLoading: DefaultDisplayLoading = ({
  formControl: { values },
  rsfName: name,
}) => getIn({ values, name }) === undefined;
