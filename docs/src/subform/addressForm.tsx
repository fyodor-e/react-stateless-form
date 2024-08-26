import { OnSubmit, useForm } from "@react-stateless-form/use-form";
import { Field } from "@react-stateless-form/field";
import { useCallback } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getInErrors } from "@react-stateless-form/utils";

type Values = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street1: string;
  street2?: string | undefined;
};

const resolver = yupResolver(
  Yup.object({
    country: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required"),
    street1: Yup.string().required("Required"),
    street2: Yup.string(),
  }),
);

const AddressForm = () => {
  const onSubmit = useCallback<OnSubmit<Values>>(
    ({ formControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const formControl = useForm({
    values: {
      country: "",
      state: "",
      city: "",
      zipCode: "",
      street1: "",
      street2: undefined,
    },
    onSubmit,
    resolver,
  });

  return (
    <div
      style={{
        gap: "7px",
        margin: "15px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label>Country</label>
      <Field formControl={formControl} rsfName="country" rsfComponent="select">
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="Mexico">Mexico</option>
      </Field>
      {getInErrors({ errors: formControl.errors, name: "country" })}
      <label>State</label>
      <Field formControl={formControl} rsfName="state" rsfComponent="input" />
      <label>City</label>
      <Field formControl={formControl} rsfName="city" rsfComponent="input" />
      {!formControl.isValid && (
        <>
          <div css={{ color: "red" }}>Form have errors:</div>
          <div css={{ color: "red" }}>{JSON.stringify(formControl.errors)}</div>
        </>
      )}
      <button onClick={formControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default AddressForm;
