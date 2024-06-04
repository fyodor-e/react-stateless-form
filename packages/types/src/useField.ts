import { type FC } from "react";
import { FormState } from "./formState";
import { ConvertFunction } from "./convertFunction";
import { DisplayLoading } from "./displayLoading";
import { DefaultBaseProps, BasePropsCreator } from "./field";
import { KeyPaths } from "./keyPaths";

export type UseFieldArg<
  Values extends {},
  BaseProps extends { value: any } = DefaultBaseProps,
> = {
  LoadingComponent?: FC<BasePropsCreator<Values, KeyPaths<Values>, BaseProps>>;
  displayLoading?: DisplayLoading<Values>;
  convertFunction?: ConvertFunction<Values, BaseProps>;
} & FormState<Values>;
