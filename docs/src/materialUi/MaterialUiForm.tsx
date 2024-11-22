/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OnSubmit,
  useForm,
  Field,
  ConvertHook,
  getIn,
  getInErrors,
} from "react-stateless-form";
import { useCallback, useMemo } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

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

const useConvert: ConvertHook<Values, TextFieldProps> = ({
  rsfName: name,
  formControl: { values, errors, touched, setFieldValue, setFieldTouched },
}) => {
  const value = getIn({ values, name: name as any });
  const error = getInErrors({ errors, name: name as any });
  const fieldError = error.length ? error.join(", ") : undefined;
  const fieldTouched = !!getIn({ values: touched, name: name as any });

  return useMemo(() => {
    return {
      value,
      error: fieldTouched && !!fieldError,
      helperText: (fieldTouched && fieldError) || " ",
      onBlur: () => setFieldTouched({ name: name as any, touched: true }),
      onChange: ({ target: { value } }) =>
        setFieldValue({ name: name as any, value }),
    };
  }, [name, value, fieldError, fieldTouched, setFieldTouched, setFieldValue]);
};

const MaterialUiForm = () => {
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
      street2: "",
    },
    onSubmit,
    resolver,
  });

  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <Box component="div" sx={{ display: "flex", gap: "10px" }}>
        <Box
          component="div"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Field
            formControl={formControl}
            rsfName="country"
            rsfComponent={TextField}
            label="Country"
            useConvert={useConvert}
          />
          <Field
            formControl={formControl}
            rsfName="state"
            rsfComponent={TextField}
            label="State"
            useConvert={useConvert}
          />
          <Field
            formControl={formControl}
            rsfName="city"
            rsfComponent={TextField}
            label="City"
            useConvert={useConvert}
          />
        </Box>
        <Box
          component="div"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Field
            formControl={formControl}
            rsfName="zipCode"
            rsfComponent={TextField}
            label="Zip Code"
            useConvert={useConvert}
          />
          <Field
            formControl={formControl}
            rsfName="street1"
            rsfComponent={TextField}
            label="Street Address 1"
            useConvert={useConvert}
          />
          <Field
            formControl={formControl}
            rsfName="street2"
            rsfComponent={TextField}
            label="Street Address 2"
            useConvert={useConvert}
          />
        </Box>
      </Box>
      <Button
        disabled={formControl.isSubmitting}
        onClick={formControl.handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default MaterialUiForm;