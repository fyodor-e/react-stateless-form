import { FC } from "react";
import { Field } from "../src/Field";
import { FormContext, Modifiers } from "@react-stateless-form/types";

type Values = {
  prop1: "prop1";
};

const context: FormContext<Values> = {
  values: { prop1: "prop1" },
  touched: {},
  errors: {},
  setValues: () => {},
  setErrors: () => {},
  setTouched: () => {},
  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
};

type SimpleComponentProps = {
  requiredProp: string;
  optionalProp?: number;
  value: "prop1";
};

const SimpleComponent: FC<SimpleComponentProps> = () => null;

const Success = () => {
  const modifiers: Modifiers<Values> = {
    converter: () => ({
      requiredProp: "123",
      optionalProp: 1,
      value: "prop1",
    }),
    ...context,
  };

  return (
    <>
      <Field
        modifiers={modifiers}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
      />
      <Field
        modifiers={modifiers}
        rsfComponent={SimpleComponent}
        // @ts-expect-error
        rsfName="errorProp"
        requiredProp="2"
      />
      {/* @ts-expect-error */}
      <Field
        modifiers={modifiers}
        rsfComponent={SimpleComponent}
        rsfName="prop1" /* requiredProp="2" */
      />
    </>
  );
};

type IncompatibleValueType = {
  value: number;
};
const IncompatibleValueTypeComponent: FC<IncompatibleValueType> = () => null;

const IncompatibleValueTypeTest = () => {
  const modifiers: Modifiers<Values> = {
    converter: () => ({
      value: 1,
    }),
    ...context,
  };

  return (
    <Field
      modifiers={modifiers}
      // @ts-expect-error
      rsfComponent={IncompatibleValueTypeComponent}
      rsfName="prop1"
    />
  );
};

type AlternativeBaseProps = {
  requiredProp: string;
  optionalProp?: number;
  onBlur: () => void;
  value: "prop1";
};
const Component2: FC<AlternativeBaseProps> = () => null;

const RequiredPropMissingInConverter = () => {
  const modifiers: Modifiers<Values, AlternativeBaseProps> = {
    // @ts-expect-error
    converter: () => ({
      onBlur: () => {},
      value: "prop1",
      optionalProp: 2,
    }),
    ...context,
  };

  return null;
};

type AnotherComponentProps = { anotherRequiredProp: number };
const AnotherComponent: FC<AnotherComponentProps> = () => null;

const IncompatibleComponent = () => {
  const modifiers: Modifiers<Values> = {
    converter: () => ({
      onBlur: () => {},
      value: "prop1",
      optionalProp: 2,
      requiredProp: "",
    }),
    ...context,
  };

  return (
    <Field
      modifiers={modifiers}
      // @ts-expect-error
      rsfComponent={AnotherComponent}
      rsfName="prop1"
    />
  );
};

type AlternativeBaseProps2 = { additionlProp: string; value: "prop1" };
const AlternativeComponent: FC<AlternativeBaseProps2> = () => null;

const AdditionalConevrtFunctionProps = () => {
  const modifiers: Modifiers<Values, AlternativeBaseProps2> = {
    converter: () => ({ value: "prop1", additionlProp: "" }),
    ...context,
  };

  return (
    <Field
      modifiers={modifiers}
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
    />
  );
};

const AdditionalPropIsPresentInFieldProps = () => {
  const modifiers: Modifiers<Values> = {
    converter: () => ({ value: "prop1", additionlProp: "" }),
    ...context,
  };

  return (
    <Field
      modifiers={modifiers}
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
      additionlProp=""
    />
  );
};
