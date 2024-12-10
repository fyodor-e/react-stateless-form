import { OnSubmit, useForm, Field } from "react-stateless-form";
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

  const rsfFormControl = useForm({
    initialValues: { firstName: "", lastName: "" },
    onSubmit,
    resolver,
  });

  return (
    <div
      style={{
        gap: "7px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label>First Name</label>
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="firstName"
        rsfComponent="input"
      />
      <input />
      <label>Last Name</label>
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="lastName"
        rsfComponent="input"
      />
      {!rsfFormControl.isValid && (
        <>
          <div css={{ color: "red" }}>Form have errors:</div>
          <div css={{ color: "red" }}>
            {JSON.stringify(rsfFormControl.errors)}
          </div>
        </>
      )}
      <button onClick={rsfFormControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default SimpleForm;
