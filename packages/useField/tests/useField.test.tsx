import { FC } from "react";
import useField from "../src/useField";
import { FormContext } from "@react-stateless-form/types";

type Values = {
  prop1: "prop1";
};

const context: FormContext<Values> = {
  values: { prop1: "prop1" },
  touched: {},
  errors: {},
  setValue: () => {},
};

type SimpleComponentProps = {
  requiredProp: string;
  optionalProp?: number;
  value: "prop1";
  onBlur: () => void;
};
const SimpleComponent: FC<SimpleComponentProps> = () => null;

const Success = () => {
  const Field = useField<Values>({
    ...context,
    convertFunction: ({ rsfName, values }) => ({
      value: "prop2",
      onBlur: () => {},
    }),
  });

  return (
    <Field rsfComponent={SimpleComponent} rsfName="prop1" requiredProp="2" />
  );
};

type AlternativeBaseProps = {
  requiredProp: string;
  optionalProp?: number;
  onBlur: () => void;
};

const RequiredPropMissingInConvertFunction = () => {
  const Field = useField<Values, AlternativeBaseProps>({
    ...context,
    // @ts-expect-error
    convertFunction: () => ({
      onBlur: () => {},
      value: "prop1",
      optionalProp: 2,
    }),
  });

  return <Field rsfComponent={SimpleComponent} rsfName="prop1" />;
};

type AnotherComponentProps = { anotherRequiredProp: number };
const AnotherComponent: FC<AnotherComponentProps> = () => null;

const IncompatibleComponent = () => {
  const Field = useField<Values, AlternativeBaseProps>({
    ...context,
    convertFunction: () => ({
      onBlur: () => {},
      value: "prop1",
      optionalProp: 2,
      requiredProp: "",
    }),
  });

  // @ts-expect-error
  return <Field rsfComponent={AnotherComponent} rsfName="prop1" />;
};

type AlternativeBaseProps2 = { additionlProp: string };
const AlternativeComponent: FC<AlternativeBaseProps2> = () => null;

const AdditionalConevrtFunctionProps = () => {
  const Field = useField<Values, AlternativeBaseProps2>({
    ...context,
    convertFunction: () => ({ value: "prop1", additionlProp: "" }),
  });

  return <Field rsfComponent={AlternativeComponent} rsfName="prop1" />;
};

const AdditionalPropIsPresentInFieldProps = () => {
  const Field = useField<Values, AlternativeBaseProps2>({
    ...context,
    convertFunction: () => ({ value: "prop1", additionlProp: "" }),
  });

  return (
    <Field
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
      additionlProp=""
    />
  );
};
