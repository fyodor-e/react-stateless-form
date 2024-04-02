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
  const Field = useField(context);

  return (
    <>
      <Field rsfComponent={SimpleComponent} rsfName="prop1" requiredProp="2" />
      <Field
        rsfComponent={SimpleComponent}
        // @ts-expect-error
        rsfName="errorProp"
        requiredProp="2"
      />
      {/* @ts-expect-error */}
      <Field
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
  const Field = useField(context);

  return (
    // @ts-expect-error
    <Field rsfComponent={IncompatibleValueTypeComponent} rsfName="prop1" />
  );
};

type AlternativeBaseProps = {
  requiredProp: string;
  optionalProp?: number;
  onBlur: () => void;
};
const Component2: FC<AlternativeBaseProps> = () => null;

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

  return <Field rsfComponent={Component2} rsfName="prop1" />;
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
