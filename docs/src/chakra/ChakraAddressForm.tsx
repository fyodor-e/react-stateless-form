import { yupResolver } from "@hookform/resolvers/yup";
import { OnSubmit, useForm, Field } from "react-stateless-form";
import { useCallback } from "react";
import * as Yup from "yup";
import ChakraFormInput from "./ChakraFormInput";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

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
    ({ rsfFormControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const rsfFormControl = useForm({
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
    <ChakraProvider>
      <VStack w="full" alignItems="flex-start">
        <HStack>
          <VStack>
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="country"
              rsfComponent={ChakraFormInput}
              label="Country"
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="state"
              rsfComponent={ChakraFormInput}
              label="State"
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="city"
              rsfComponent={ChakraFormInput}
              label="City"
            />
          </VStack>
          <VStack>
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="zipCode"
              rsfComponent={ChakraFormInput}
              label="Zip Code"
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="street1"
              rsfComponent={ChakraFormInput}
              label="Street Address 1"
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="street2"
              rsfComponent={ChakraFormInput}
              label="Street Address 2"
            />
          </VStack>
        </HStack>
        <Button onClick={rsfFormControl.handleSubmit}>Submit</Button>
      </VStack>
    </ChakraProvider>
  );
};

export default ChakraAddressForm;
