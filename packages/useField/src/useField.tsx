import {
  type FC,
  useCallback,
  useMemo,
  DependencyList,
  ReactNode,
} from "react";
import {
  KeyPaths,
  Field,
  FormErrors,
  FormTouched,
  ConvertFunction,
  NameAndComponentProps,
  DefaultBaseProps,
  FormContext,
} from "@react-stateless-form/types";

type FormProps = {
  value: any | undefined;
  error: string | undefined;
  touched: boolean | undefined;
  onBlur: () => void;
};

// type ConvertFunction<
//   Values extends {},
//   ComponentProps extends {},
//   Name extends KeyPaths<Values> = KeyPaths<Values>,
//   AdditionalProps extends {} = {},
// > = (
//   props: Partial<ComponentProps> &
//     NameAndComponentProps<Values, ComponentProps, Name> &
//     FormProps &
//     AdditionalProps,
// ) => ComponentProps;

// type DisplayLoading<
//   Values extends {},
//   ComponentProps extends {},
//   Name extends KeyPaths<Values> = KeyPaths<Values>,
//   AdditionalProps extends {} = {},
// > = (
//   props: Partial<ComponentProps> &
//     NameAndComponentProps<Values, ComponentProps, Name> &
//     FormProps &
//     AdditionalProps,
// ) => boolean;

// const defaultDisplayLoading: DisplayLoading<{}> = ({ value }) =>
//   value === undefined;

const defaultConvertFunction: ConvertFunction<any> = (props) => props as any;

function useField<Values extends {}>(
  {
    values,
    errors,
    touched,

    convertFunction = defaultConvertFunction,
    // Loading,
    // displayLoading = defaultDisplayLoading,
  }: {
    convertFunction: ConvertFunction<Values>;
    // Loading?: FC<Partial<ComponentProps> & FormProps & AdditionalProps>;
    // displayLoading?: DisplayLoading<Values, ComponentProps, KeyPaths<Values>, AdditionalProps>;
  } & FormContext<Values>,
  deps: DependencyList,
): Field<Values> {
  return useCallback(
    (props) => {
      const generatedProps = convertFunction({
        ...props,
        values,
        errors,
        touched,
      });
      // const isLoading = displayLoading({
      //   ...props,
      //   value: 1,
      //   error: "error",
      //   touched: true,
      //   onBlur: () => {},
      // });
      const { rsfComponent: Component, ...restProps } = props;

      // if (isLoading && Loading)
      //   return <Loading {...restProps} {...generatedProps} />;

      return <Component {...generatedProps} {...restProps} />;
    },
    [deps],
  );
}

export default useField;
