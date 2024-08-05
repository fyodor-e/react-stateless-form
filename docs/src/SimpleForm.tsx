import { OnSubmit, useForm } from "@react-stateless-form/use-form";
import { Field } from "@react-stateless-form/field";
import { useCallback } from "react";

type Values = {
  firstName: string;
  lastName: string;
};

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
      <button onClick={formControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default SimpleForm;
