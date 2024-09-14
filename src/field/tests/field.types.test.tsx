import { FC, PropsWithChildren } from "react";
import { Field } from "../Field";
import { DefaultBaseProps, FormControl } from "../../types";
import { ConvertHook } from "../convertHook";

type Values = {
  prop1: "prop1";
  stringProp: string;
  numberProp: number;
  embeddedObj: {
    prop2: "prop2";
  };
};

const formControl: FormControl<Values> = {
  values: {
    prop1: "prop1",
    stringProp: "123",
    numberProp: 90,
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

// 1. Value assignability
//    (i.e. value: string should be assugnable to ComponentProps' value: string | undefined)

type ValueStringUndefined = {
  value: string | undefined;
};

const ValueStringUndefinedComponent: FC<ValueStringUndefined> = () => null;

const ValueStringUndefinedField = () => {
  return (
    <>
      <Field
        formControl={formControl}
        rsfComponent={ValueStringUndefinedComponent}
        rsfName="stringProp"
      />
      {/* @ts-expect-error */}
      <Field
        formControl={formControl}
        rsfComponent={ValueStringUndefinedComponent}
        rsfName="numberProp"
      />
    </>
  );
};

type ValueNumber = {
  value: number;
};

const ValueNumberComponent: FC<ValueNumber> = () => null;

const ValueNumberField = () => {
  return (
    <>
      <Field
        formControl={formControl}
        rsfComponent={ValueNumberComponent}
        rsfName="numberProp"
      />
      {/* @ts-expect-error */}
      <Field
        formControl={formControl}
        rsfComponent={ValueNumberComponent}
        rsfName="stringProp"
      />
    </>
  );
};

// 2. Additional props in Component's props

type AdditionalProps = {
  requiredProp: string;
  optionalProp?: number;
  value: string;
};

const AdditionalPropsComponent: FC<AdditionalProps> = () => null;

const AdditionalPropsField = () => {
  return (
    <>
      <Field
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
      />
      <Field
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        // @ts-expect-error
        requiredProp={2} // should be a string
        formControl={formControl}
      />
      {/* @ts-expect-error */}
      <Field
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        formControl={formControl}
        // requiredProp="2" - missing
      />
      <Field
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
        optionalProp={123}
      />
      <Field
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
        // @ts-expect-error
        optionalProp="123" // should be a number
      />
    </>
  );
};

// 2.1 useConvert provide additional props

const useConvertWithAdditionalProps: ConvertHook<
  Values,
  AdditionalProps
> = () => ({
  requiredProp: "123",
  optionalProp: 1,
  value: "prop1",
});

const UseConvertWithAdditionalPropsField = () => {
  return (
    <>
      <Field
        useConvert={useConvertWithAdditionalProps}
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        formControl={formControl}
      />
      <Field
        useConvert={useConvertWithAdditionalProps}
        rsfComponent={AdditionalPropsComponent}
        // @ts-expect-error
        rsfName="errorProp"
        formControl={formControl}
      />
      <Field
        useConvert={useConvertWithAdditionalProps}
        rsfComponent={AdditionalPropsComponent}
        formControl={formControl}
        rsfName="prop1"
        requiredProp="2" // may be provided
        optionalProp={1} // as well as optionalProp
      />
    </>
  );
};

// 2.2 useConvert produce only base props

const useConvertBase: ConvertHook<Values> = () => ({
  value: "prop1",
  onChange: () => {},
});

const ConvertWithOnlyBasePropsField = () => {
  return (
    <>
      <Field
        useConvert={useConvertBase}
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        requiredProp="2"
        formControl={formControl}
      />
      {/* @ts-expect-error */}
      <Field
        useConvert={useConvertBase}
        rsfComponent={AdditionalPropsComponent}
        rsfName="prop1"
        // requiredProp="2" - missing
        formControl={formControl}
      />
      {/* @ts-expect-error */}
      <Field
        useConvert={useConvertBase}
        rsfComponent={AdditionalPropsComponent}
        rsfName="embeddedObj" // should be prop1
        requiredProp="2"
        formControl={formControl}
      />
    </>
  );
};

// 3. useConvert types test

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
});

// 4. Return props from converter function
//    are not compatible with provided component

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

// 5. BaseProps does not contain value but has selected prop

type BasePropsWithSelected = {
  additionlProp: string;
  selected: "prop1";
  value: any;
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
      {/* @ts-expect-error */}
      <Field
        formControl={formControl}
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
