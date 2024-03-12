import { FC } from "react";
import { FieldType } from "../src/field";

type Values = {
  prop1: "prop1";
  embeddedObj: {
    prop2: "prop2";
  };
};

const FieldComponent: FieldType<Values> = () => null;

type ComponentProps = {
  value: "prop1";
  onBlur: () => void;
  additionalProp: "additionalProp";
};

const CustomComponent: FC<ComponentProps> = () => null;

const Success = () => (
  <FieldComponent
    rsfName="prop1"
    rsfComponent={CustomComponent}
    additionalProp="additionalProp"
  />
);

const ValueTypeIncompatible = () => (
  <FieldComponent
    rsfName="embeddedObj.prop2"
    // @ts-expect-error
    rsfComponent={CustomComponent}
    additionalProp="additionalProp"
  />
);

const MissingAdditionalPropOfTheRsfComponent = () => (
  // @ts-expect-error
  <FieldComponent rsfName="prop1" rsfComponent={CustomComponent} />
);

type ComponentWithSelectedProps = {
  selected: "prop1";
  onBlur: () => void;
};

// ----- Override value -----
const OverrideValue = () => (
  <FieldComponent
    rsfName="prop1"
    rsfComponent={CustomComponent}
    additionalProp="additionalProp"
    value="prop1"
  />
);

const IcorrectOverrideValue = () => (
  <FieldComponent
    rsfName="prop1"
    rsfComponent={CustomComponent}
    additionalProp="additionalProp"
    // @ts-expect-error
    value="propIncorrect"
  />
);

// ----- Rename value prop to selected -----
const ComponentWithSelected: FC<ComponentWithSelectedProps> = () => null;

const FieldComponentWithSelected: FieldType<
  Values,
  undefined,
  "selected"
> = () => null;

const ValueIsSelected = () => (
  <FieldComponentWithSelected
    rsfName="prop1"
    rsfComponent={ComponentWithSelected}
  />
);

// ----- Alternative BaseProps -----
type AlternativeBaseProps = {
  value: "prop1";
  onAction: (value: string) => void;
  additionalProp1: "additionalProp1";
};

const AlternativeBaseComponent: FC<AlternativeBaseProps> = () => null;
const FieldComponentWithAlternativeBase: FieldType<
  Values,
  AlternativeBaseProps
> = () => null;

const AlternativeBaseSuccess = () => (
  <FieldComponentWithAlternativeBase
    rsfName="prop1"
    rsfComponent={AlternativeBaseComponent}
  />
);

const OverrideAlternativeBase = () => (
  <FieldComponentWithAlternativeBase
    rsfName="prop1"
    rsfComponent={AlternativeBaseComponent}
    onAction={() => {}}
    additionalProp1="additionalProp1"
  />
);

const IncompatibleBase = () => (
  <FieldComponentWithAlternativeBase
    rsfName="prop1"
    // @ts-expect-error
    rsfComponent={CustomComponent}
  />
);
