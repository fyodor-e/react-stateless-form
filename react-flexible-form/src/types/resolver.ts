/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormErrors } from ".";

type ResolverSuccess<Values extends object> = {
  values: Values;
  errors: undefined;
};

type ResolverError<Values extends object> = {
  values: undefined;
  errors: FormErrors<Values>;
};

export type ResolverResult<Values extends object> =
  | ResolverSuccess<Values>
  | ResolverError<Values>;

interface ResolverOptions {
  criteriaMode?: "all" | "firstError";
  shouldUseNativeValidation: boolean;
  fields: undefined;
  names?: undefined;
}

export type Resolver<Values extends object> = (
  values: Values,
  context: any | undefined,
  options: ResolverOptions,
) => Promise<ResolverResult<Values>> | ResolverResult<Values>;
