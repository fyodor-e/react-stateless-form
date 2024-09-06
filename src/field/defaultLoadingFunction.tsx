import { DefaultDisplayLoading } from "./displayLoading";
import { getIn } from "../utils";

export const defaultDisplayLoading: DefaultDisplayLoading = ({
  formControl: { values },
  rsfName: name,
}) => getIn({ values, name }) === undefined;
