/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ValidateResult = string | string[] | boolean | undefined;

export type FieldError = {
  type?: string;
  types?: {
    [key: string]: ValidateResult;
  };
  message?: string;
};

export type FormErrors<V> =
  // Check for V = any
  0 extends 1 & V
    ? any
    : V extends object
      ? {
          [K in keyof V]?: V[K] extends (infer A)[]
            ? FieldError | (FormErrors<A> | undefined)[]
            : FieldError | FormErrors<V[K]>;
        }
      : FieldError;

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

export interface ResolverOptions {
  criteriaMode?: "all" | "firstError";
  fields: {};
  names?: undefined;
}

export type Resolver<Values extends object> = (
  values: Values,
  context: any | undefined,
  options: ResolverOptions,
) => Promise<ResolverResult<Values>> | ResolverResult<Values>;
