import { OnSubmit, useForm, Field } from "react-stateless-form";
import { useCallback, useState } from "react";
import { Button, HStack, Skeleton, VStack } from "@chakra-ui/react";
import ChakraFormInput from "../chakra/ChakraFormInput";

type Values = {
  country: string | undefined;
  state: string | undefined;
  city: string | undefined;
  zipCode: string | undefined;
  street1: string | undefined;
  street2?: string | undefined;
};

const LoadingComonent = () => <Skeleton w="full" h="96px" />;

const FormWithLoader = () => {
  const onSubmit = useCallback<OnSubmit<Values>>(
    ({ formControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const formControl = useForm<Values>({
    values: {
      country: "",
      state: "",
      city: "",
      zipCode: "",
      street1: "",
      street2: "",
    },
    onSubmit,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleReload = useCallback(() => {
    setIsLoading(true);
    formControl.setFieldValue("", {
      country: undefined,
      state: undefined,
      city: undefined,
      zipCode: undefined,
      street1: undefined,
      street2: undefined,
    });
    setTimeout(() => {
      formControl.setFieldValue("", {
        country: "US",
        state: "LA",
        city: "Los Angeles",
        zipCode: "90000",
        street1: "Street 1",
        street2: "",
      });
      setIsLoading(false);
    }, 3000);
  }, [formControl]);

  return (
    <VStack w="full" alignItems="flex-start">
      <Button onClick={handleReload}>Reload</Button>
      <HStack w="full">
        <VStack flex="1">
          <Field
            formControl={formControl}
            rsfName="country"
            rsfComponent={ChakraFormInput}
            label="Country"
            LoadingComponent={LoadingComonent}
          />
          <Field
            formControl={formControl}
            rsfName="state"
            rsfComponent={ChakraFormInput}
            label="State"
            LoadingComponent={LoadingComonent}
          />
          <Field
            formControl={formControl}
            rsfName="city"
            rsfComponent={ChakraFormInput}
            label="City"
            LoadingComponent={LoadingComonent}
          />
        </VStack>
        <VStack flex="1">
          <Field
            formControl={formControl}
            rsfName="zipCode"
            rsfComponent={ChakraFormInput}
            label="Zip Code"
            LoadingComponent={LoadingComonent}
          />
          <Field
            formControl={formControl}
            rsfName="street1"
            rsfComponent={ChakraFormInput}
            label="Street Address 1"
            LoadingComponent={LoadingComonent}
          />
          <Field
            formControl={formControl}
            rsfName="street2"
            rsfComponent={ChakraFormInput}
            label="Street Address 2"
            LoadingComponent={LoadingComonent}
          />
        </VStack>
      </HStack>
      <Button isDisabled={isLoading} onClick={formControl.handleSubmit}>
        Submit
      </Button>
    </VStack>
  );
};

export default FormWithLoader;
