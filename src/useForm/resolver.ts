import { FormErrors } from "@react-stateless-form/types";

type ResolverSuccess<Values extends object> = {
  values: Values;
  errors: {};
};

type ResolverError<Values extends object> = {
  values: {};
  errors: FormErrors<Values>;
};

export type ResolverResult<Values extends object> =
  | ResolverSuccess<Values>
  | ResolverError<Values>;

interface ResolverOptions {
  criteriaMode?: "all" | "firstError";
  shouldUseNativeValidation: boolean;
  fields: {};
  names?: undefined;
}

export type Resolver<Values extends object> = (
  values: Values,
  context: any | undefined,
  options: ResolverOptions,
) => Promise<ResolverResult<Values>> | ResolverResult<Values>;
