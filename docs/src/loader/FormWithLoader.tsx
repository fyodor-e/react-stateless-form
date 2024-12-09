import { OnSubmit, useForm, Field } from "react-stateless-form";
import { useCallback, useState } from "react";
import { Button, HStack, Skeleton, VStack } from "@chakra-ui/react";
import ChakraFormInput from "../chakra/ChakraFormInput";
import { ChakraProvider } from "@chakra-ui/react";

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

  const rsfFormControl = useForm<Values>({
    initialValues: {
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
    rsfFormControl.setFieldValue("", {
      country: undefined,
      state: undefined,
      city: undefined,
      zipCode: undefined,
      street1: undefined,
      street2: undefined,
    });
    setTimeout(() => {
      rsfFormControl.setFieldValue("", {
        country: "US",
        state: "LA",
        city: "Los Angeles",
        zipCode: "90000",
        street1: "Street 1",
        street2: "",
      });
      setIsLoading(false);
    }, 3000);
  }, [rsfFormControl]);

  return (
    <ChakraProvider>
      <VStack w="full" alignItems="flex-start">
        <Button onClick={handleReload}>Reload</Button>
        <HStack w="full">
          <VStack flex="1">
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="country"
              rsfComponent={ChakraFormInput}
              label="Country"
              rsfLoadingComponent={LoadingComonent}
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="state"
              rsfComponent={ChakraFormInput}
              label="State"
              rsfLoadingComponent={LoadingComonent}
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="city"
              rsfComponent={ChakraFormInput}
              label="City"
              rsfLoadingComponent={LoadingComonent}
            />
          </VStack>
          <VStack flex="1">
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="zipCode"
              rsfComponent={ChakraFormInput}
              label="Zip Code"
              rsfLoadingComponent={LoadingComonent}
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="street1"
              rsfComponent={ChakraFormInput}
              label="Street Address 1"
              rsfLoadingComponent={LoadingComonent}
            />
            <Field
              rsfFormControl={rsfFormControl}
              rsfName="street2"
              rsfComponent={ChakraFormInput}
              label="Street Address 2"
              rsfLoadingComponent={LoadingComonent}
            />
          </VStack>
        </HStack>
        <Button isDisabled={isLoading} onClick={rsfFormControl.handleSubmit}>
          Submit
        </Button>
      </VStack>
    </ChakraProvider>
  );
};

export default FormWithLoader;
