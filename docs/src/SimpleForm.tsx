import { OnSubmit, useForm } from "@react-stateless-form/use-form";
import { Field } from "@react-stateless-form/field";
import { useCallback } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type Values = {
  firstName: string;
  lastName: string;
};

const resolver = yupResolver(
  Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
  }),
);

const SimpleForm = () => {
  const onSubmit = useCallback<OnSubmit<Values>>(
    ({ formControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const formControl = useForm({
    values: { firstName: "", lastName: "" },
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
      <h1>Simple Form</h1>
      <label>First Name</label>
      <Field
        formControl={formControl}
        rsfName="firstName"
        rsfComponent="input"
      />
      <label>Last Name</label>
      <Field
        formControl={formControl}
        rsfName="lastName"
        rsfComponent="input"
      />
      <div>Errors:</div>
      <div>{JSON.stringify(formControl.errors)}</div>
      <button onClick={formControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default SimpleForm;
