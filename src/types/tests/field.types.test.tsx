import { FC, PropsWithChildren } from "react";
import { Field } from "../";
import { ConvertHook, DefaultBaseProps, FormControl } from "../";

type Values = {
  prop1: "prop1";
  stringProp: string;
  embeddedObj: {
    prop2: "prop2";
  };
};

const formControl: FormControl<Values> = {
  values: {
    prop1: "prop1",
    stringProp: "123",
    embeddedObj: {
      prop2: "prop2",
    },
  },
  touched: {},
  errors: {},
  dirty: {},
  setFieldValue: () => {},
  setFieldError: () => {},
  setFieldTouched: () => {},
  setFieldDirty: () => {},

  submitCount: 0,
  isSubmitting: false,
  handleSubmit: () => Promise.resolve(),
  isValid: true,
};

type SimpleComponentProps = {
  requiredProp: string;
  optionalProp?: number;
  value: "prop1";
};

const SimpleComponent: FC<SimpleComponentProps> = () => null;

const SimpleComponentNoUseConvert = () => {
  return (
    <>
      <Field
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
      />
      <Field
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        // @ts-expect-error
        requiredProp={2} // should be a string
        formControl={formControl}
      />
      <Field
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        formControl={formControl}
        // requiredProp="2" - missing
      />
      <Field
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
        optionalProp={123}
      />
      <Field
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
        // @ts-expect-error
        optionalProp="123" // should be a number
      />
    </>
  );
};

const useConvert: ConvertHook<Values, SimpleComponentProps> = () => ({
  requiredProp: "123",
  optionalProp: 1,
  value: "prop1",
});

const SimpleComponentWithUseConvert = () => {
  return (
    <>
      <Field
        useConvert={useConvert}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
      />
      <Field
        useConvert={useConvert}
        // @ts-expect-error
        rsfComponent={SimpleComponent}
        // @ts-expect-error
        rsfName="errorProp"
        requiredProp="2"
        formControl={formControl}
      />
      <Field
        useConvert={useConvert}
        formControl={formControl}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        // requiredProp="2" - no need requiredProp here as useConvert provide it
      />
    </>
  );
};

// useConvert produce only base props

const useConvertBase: ConvertHook<Values> = () => ({
  value: "prop1",
  onChange: () => {},
});

const ConvertWithOnlyBaseProps = () => {
  return (
    <>
      <Field
        useConvert={useConvertBase}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
      />
      {/* @ts-expect-error */}
      <Field
        useConvert={useConvertBase}
        rsfComponent={SimpleComponent}
        rsfName="prop1"
        // requiredProp="2" - missing
        formControl={formControl}
      />
      <Field
        useConvert={useConvertBase}
        // @ts-expect-error
        rsfComponent={SimpleComponent}
        rsfName="embeddedObj" // should be prop1
        requiredProp="2"
        formControl={formControl}
      />
    </>
  );
};

const ValueTypeIncompatible = () => {
  return (
    <Field
      useConvert={useConvert}
      formControl={formControl}
      rsfName="embeddedObj.prop2"
      // @ts-expect-error
      rsfComponent={SimpleComponent}
    />
  );
};

const useConvertWithRequired: ConvertHook<
  Values,
  SimpleComponentProps
> = () => ({
  requiredProp: "123",
  optionalProp: 1,
  value: "prop1",
});

const OverrideValue = () => {
  return (
    <>
      <Field
        useConvert={useConvertWithRequired}
        formControl={formControl}
        rsfName="prop1"
        rsfComponent={SimpleComponent}
        value="prop1"
      />
      <Field
        useConvert={useConvertWithRequired}
        formControl={formControl}
        rsfName="prop1"
        rsfComponent={SimpleComponent}
        // @ts-expect-error
        value={2} // Incorrect value type
      />
    </>
  );
};

type ComponentWithValueStringUndefinedProps = {
  label: string;
  value: string | undefined;
};

const ComponentWithValueStringUndefined: FC<
  ComponentWithValueStringUndefinedProps
> = () => null;

const FieldComponentWithValueStringUndefined = () => {
  return (
    <>
      <Field
        formControl={formControl}
        rsfComponent={ComponentWithValueStringUndefined}
        rsfName="stringProp"
      />
    </>
  );
};

type IncompatibleValueType = {
  value: number;
};
const IncompatibleValueTypeComponent: FC<IncompatibleValueType> = () => null;

const useConvertIncompatible: ConvertHook<Values> = () => ({
  value: 1,
});

const IncompatibleValueTypeTest = () => {
  return (
    <Field
      useConvert={useConvertIncompatible}
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

const useConvertRequiredIsMissing: ConvertHook<
  Values,
  AlternativeBaseProps
> = () =>
  // @ts-expect-error
  ({
    onBlur: () => {},
    value: "prop1",
    optionalProp: 2,
  });

type AnotherComponentProps = { anotherRequiredProp: number };
const AnotherComponent: FC<AnotherComponentProps> = () => null;

const useConvertIncompatible2: ConvertHook<Values> = () => ({
  onBlur: () => {},
  value: "prop1",
  optionalProp: 2,
  requiredProp: "",
});

// Return props from converter function are not compatible with provided component
const IncompatibleComponent = () => {
  return (
    <Field
      useConvert={useConvertIncompatible2}
      formControl={formControl}
      // @ts-expect-error
      rsfComponent={AnotherComponent}
      rsfName="prop1"
    />
  );
};

type AlternativeBaseProps2 = { additionlProp: string; value: "prop1" };
const AlternativeComponent: FC<AlternativeBaseProps2> = () => null;

const useConvertAdditional: ConvertHook<
  Values,
  AlternativeBaseProps2
> = () => ({
  value: "prop1",
  additionlProp: "",
});

const AdditionalConevrtFunctionProps = () => {
  return (
    <Field
      useConvert={useConvertAdditional}
      formControl={formControl}
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
    />
  );
};

const AdditionalPropIsPresentInFieldProps = () => {
  return (
    <Field
      useConvert={useConvertAdditional}
      formControl={formControl}
      rsfComponent={AlternativeComponent}
      rsfName="prop1"
      additionlProp=""
    />
  );
};

// BaseProps does not contain value but has selected prop

type BasePropsWithSelected = {
  additionlProp: string;
  selected: "prop1";
  value?: any;
};
const ComponentWithSelectedProp: FC<BasePropsWithSelected> = () => null;

const useConvertSelected: ConvertHook<Values, BasePropsWithSelected> = () => ({
  value: undefined,
  selected: "prop1",
  additionlProp: "",
});

const BasePropsWithSelectedField = () => {
  return (
    <>
      <Field
        useConvert={useConvertSelected}
        formControl={formControl}
        rsfComponent={ComponentWithSelectedProp}
        additionlProp=""
        rsfName="prop1"
      />
      {/* Override selected prop */}
      <Field
        useConvert={useConvertSelected}
        formControl={formControl}
        rsfComponent={ComponentWithSelectedProp}
        rsfName="prop1"
        additionlProp=""
        selected="prop1"
      />
      {/* Incorrect selected prop value */}
      <Field
        useConvert={useConvertSelected}
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

const useConvertSelectedIncorrect: ConvertHook<
  Values,
  BasePropsWithSelected
> = () => ({
  // @ts-expect-error
  selected: "prop2", // should be selected: "prop1"
  additionlProp: "",
});

// useDefaultConvertHook tests

type DefaultConvertHookCompatibleProps = {
  value: "prop1";
  onChange: (arg: { target: { value: string | number } }) => void;
  onBlur: () => void;
  error: string | undefined;
  touched: boolean;
};
const DefaultConvertHookCompatibleComponent: FC<
  DefaultConvertHookCompatibleProps
> = () => null;

const DefaultConvertHookField = () => {
  return (
    <>
      <Field
        formControl={formControl}
        rsfComponent={DefaultConvertHookCompatibleComponent}
        rsfName="prop1"
      />
      <Field
        formControl={formControl}
        // @ts-expect-error
        rsfComponent={DefaultConvertHookCompatibleComponent}
        rsfName="embeddedObj"
      />
    </>
  );
};

const DefaultHookCompPropsWithRequired: FC<
  DefaultConvertHookCompatibleProps & { reqProp: "reqProp" }
> = () => null;

const DefaultHookCompPropsWithRequiredField = () => {
  return (
    <>
      <Field
        formControl={formControl}
        rsfComponent={DefaultHookCompPropsWithRequired}
        rsfName="prop1"
        reqProp="reqProp"
      />
    </>
  );
};

// Default base props
type ComponentWithRequiredAdditionalProp = {
  label: string;
  value: string;
};

// HTML <input /> component tests

const HTMLInputComponent = () => {
  return (
    <>
      <Field formControl={formControl} rsfComponent="input" rsfName="prop1" />
    </>
  );
};

// <div /> does not have props of the <input />, like onChange, etc.
const HTMLDivComponent = () => {
  return (
    <>
      <Field
        formControl={formControl}
        // @ts-expect-error
        rsfComponent="div"
        rsfName="prop1"
      />
    </>
  );
};

type OnChangeIncompatibleForInputPorps = Omit<DefaultBaseProps, "onChange"> & {
  onChange: (arg: string) => void;
};

const useConvertIncompatibleForInput: ConvertHook<
  Values,
  OnChangeIncompatibleForInputPorps
> = () => ({
  onBlur: () => {},
  onChange: () => {},
  value: "123",
});

const HTMLInputIncompatibleComponent = () => {
  return (
    <>
      <Field
        useConvert={useConvertIncompatibleForInput}
        formControl={formControl}
        // @ts-expect-error
        rsfComponent="input"
        rsfName="prop1"
      />
    </>
  );
};

// Component with children

type ComponentWithChildrenProps = {
  value: "prop1";
};

const ComponentWithChildren: FC<
  PropsWithChildren<ComponentWithChildrenProps>
> = ({ children }) => children;

const ComponentWithoutChildren: FC<ComponentWithChildrenProps> = () => null;

const ComponentWithChildrenField = () => {
  return (
    <>
      <Field
        formControl={formControl}
        rsfComponent={ComponentWithChildren}
        rsfName="prop1"
      >
        <></>
      </Field>

      {/* @ts-expect-error */}
      <Field
        formControl={formControl}
        rsfComponent={ComponentWithoutChildren}
        rsfName="prop1"
      >
        <></>
      </Field>
    </>
  );
};
