import { type FC } from "react";
import { FormControl } from "./formControl";
import { ConvertFunction } from "./convertFunction";
import { DisplayLoading } from "./displayLoading";
import { DefaultBaseProps, BasePropsCreator } from "./field";
import { KeyPaths } from "./keyPaths";

export type UseFieldArg<
  Values extends object,
  ValueName extends string = "value",
  BaseProps extends { [key in ValueName]: any } = DefaultBaseProps<ValueName>,
> = {
  LoadingComponent?: FC<
    BasePropsCreator<Values, KeyPaths<Values>, ValueName, BaseProps>
  >;
  displayLoading?: DisplayLoading;
  convertFunction?: ConvertFunction<ValueName, BaseProps>;
} & FormControl<Values>;
