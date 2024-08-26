import { yupResolver } from "@hookform/resolvers/yup";
import { Field } from "@react-stateless-form/field";
import { OnSubmit, useForm } from "@react-stateless-form/use-form";
import { useCallback } from "react";
import * as Yup from "yup";
import ChakraFormInput from "./ChakraFormInput";
import { Button, HStack, VStack } from "@chakra-ui/react";

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

const ChakraAddressForm = () => {
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
    <VStack w="full" alignItems="flex-start">
      <HStack>
        <VStack>
          <Field
            formControl={formControl}
            rsfName="country"
            rsfComponent={ChakraFormInput}
            label="Country"
          />
          <Field
            formControl={formControl}
            rsfName="state"
            rsfComponent={ChakraFormInput}
            label="State"
          />
          <Field
            formControl={formControl}
            rsfName="city"
            rsfComponent={ChakraFormInput}
            label="City"
          />
        </VStack>
        <VStack>
          <Field
            formControl={formControl}
            rsfName="zipCode"
            rsfComponent={ChakraFormInput}
            label="Zip Code"
          />
          <Field
            formControl={formControl}
            rsfName="street1"
            rsfComponent={ChakraFormInput}
            label="Street Address 1"
          />
          <Field
            formControl={formControl}
            rsfName="street2"
            rsfComponent={ChakraFormInput}
            label="Street Address 2"
          />
        </VStack>
      </HStack>
      <Button onClick={formControl.handleSubmit}>Submit</Button>
    </VStack>
  );
};

export default ChakraAddressForm;
