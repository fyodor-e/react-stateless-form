import { FC } from "react";
import { Field } from "../../useField/src/Field";
import { FormControl, Modifiers } from "@react-stateless-form/types";

type Values = {
  prop1: "prop1";
  embeddedObj: {
    prop2: "prop2";
  };
};

const formControl: FormControl<Values> = {
  values: {
    prop1: "prop1",
    embeddedObj: {
      prop2: "prop2",
    },
  },
  touched: {},
  errors: {},
  dirty: {},
  setValues: () => {},
  setErrors: () => {},
  setTouched: () => {},
  setDirty: () => {},
  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  submitCount: 0,
  isSubmitting: false,
};

type SimpleComponentProps = {
  requiredProp: string;
  optionalProp?: number;
  value: "prop1";
};

const SimpleComponent: FC<SimpleComponentProps> = () => null;

const Success = () => {
  const modifiers: Modifiers = {
    converter: () => ({
      requiredProp: "123",
      optionalProp: 1,
      value: "prop1",
    }),
  };

  return (
    <>
      <Field
        modifiers={modifiers}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
      />
      <Field
        modifiers={modifiers}
        // @ts-expect-error
        rsfComponent={SimpleComponent}
        // @ts-expect-error
        rsfName="errorProp"
        requiredProp="2"
        formControl={formControl}
      />
      {/* @ts-expect-error */}
      <Field
        modifiers={modifiers}
        formControl={formControl}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        /* requiredProp="2" */
      />
    </>
  );
};

const ValueTypeIncompatible = () => {
  const modifiers: Modifiers = {
    converter: () => ({
      requiredProp: "123",
      optionalProp: 1,
      value: "prop1",
    }),
  };

  return (
    <Field
      modifiers={modifiers}
      formControl={formControl}
      rsfName="embeddedObj.prop2"
      // @ts-expect-error
      rsfComponent={SimpleComponent}
    />
  );
};

const OverrideValue = () => {
  const modifiers: Modifiers<"value", SimpleComponentProps> = {
    converter: () => ({
      requiredProp: "123",
      optionalProp: 1,
      value: "prop1",
    }),
  };

  return (
    <>
      <Field
        modifiers={modifiers}
        formControl={formControl}
        rsfName="prop1"
        rsfComponent={SimpleComponent}
        value="prop1"
      />
      <Field
        modifiers={modifiers}
        formControl={formControl}
        rsfName="prop1"
        rsfComponent={SimpleComponent}
        // @ts-expect-error
        value={2} // Incorrect value type
      />
    </>
  );
};

type IncompatibleValueType = {
  value: number;
};
const IncompatibleValueTypeComponent: FC<IncompatibleValueType> = () => null;

const IncompatibleValueTypeTest = () => {
  const modifiers: Modifiers = {
    converter: () => ({
      value: 1,
    }),
  };

  return (
    <Field
      modifiers={modifiers}
      formControl={formControl}
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
  const modifiers: Modifiers<"value", AlternativeBaseProps> = {
    // @ts-expect-error
    converter: () => ({
      onBlur: () => {},
      value: "prop1",
      optionalProp: 2,
    }),
  };

  return null;
};

type AnotherComponentProps = { anotherRequiredProp: number };
const AnotherComponent: FC<AnotherComponentProps> = () => null;

// Return props from converter function are not compatible with provided component
const IncompatibleComponent = () => {
  const modifiers: Modifiers = {
    converter: () => ({
      onBlur: () => {},
      value: "prop1",
      optionalProp: 2,
      requiredProp: "",
    }),
  };

  return (
    <Field
      modifiers={modifiers}
      formControl={formControl}
      // @ts-expect-error
      rsfComponent={AnotherComponent}
      rsfName="prop1"
    />
  );
};

type AlternativeBaseProps2 = { additionlProp: string; value: "prop1" };
const AlternativeComponent: FC<AlternativeBaseProps2> = () => null;

const AdditionalConevrtFunctionProps = () => {
  const modifiers: Modifiers<"value", AlternativeBaseProps2> = {
    converter: () => ({ value: "prop1", additionlProp: "" }),
  };

  return (
    <Field
      modifiers={modifiers}
      formControl={formControl}
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
    />
  );
};

const AdditionalPropIsPresentInFieldProps = () => {
  const modifiers: Modifiers = {
    converter: () => ({ value: "prop1", additionlProp: "" }),
  };

  return (
    <Field
      modifiers={modifiers}
      formControl={formControl}
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
      additionlProp=""
    />
  );
};

// BaseProps does not contain value but has selected prop

type BasePropsWithSelected = { additionlProp: string; selected: "prop1" };
const ComponentWithSelectedProp: FC<BasePropsWithSelected> = () => null;

const BasePropsWithSelectedField = () => {
  const modifiers: Modifiers<"selected", BasePropsWithSelected> = {
    converter: () => ({ selected: "prop1", additionlProp: "" }),
  };

  return (
    <>
      <Field
        modifiers={modifiers}
        formControl={formControl}
        rsfComponent={ComponentWithSelectedProp}
        rsfName="prop1"
        additionlProp=""
      />
      {/* Override selected prop */}
      <Field
        modifiers={modifiers}
        formControl={formControl}
        rsfComponent={ComponentWithSelectedProp}
        rsfName="prop1"
        additionlProp=""
        selected="prop1"
      />
      {/* Incorrect selected prop value */}
      <Field
        modifiers={modifiers}
        formControl={formControl}
        rsfComponent={ComponentWithSelectedProp}
        rsfName="prop1"
        additionlProp=""
        // @ts-expect-error
        selected="incorrect value" // should be selected='prop1'
      />
    </>
  );
};

const BasePropsWithSelectedFieldIncorrectModifiers = () => {
  const incorrectModifiers: Modifiers<"selected", BasePropsWithSelected> = {
    // @ts-expect-error
    converter: () => ({
      selected: "prop2", // should be selected: "prop1"
      additionlProp: "",
    }),
  };

  const missingSelectedPropModifiers: Modifiers<
    "selected",
    BasePropsWithSelected
  > = {
    // @ts-expect-error
    converter: () => ({
      value: "prop1", // should be selected: "prop1"
      additionlProp: "",
    }),
  };
};
