import { yupResolver } from "@hookform/resolvers/yup";
import { OnSubmit, useForm, Field, useFieldArray } from "react-stateless-form";
import { useCallback, useMemo } from "react";
import * as Yup from "yup";
import { Button, HStack, VStack } from "@chakra-ui/react";
import ChakraFormInput from "../chakra/ChakraFormInput";
import { ChakraProvider } from "@chakra-ui/react";

type Values = {
  warehouse: string;
  inventory: {
    code: string;
    name: string;
    quantity: number;
  }[];
};

const resolver = yupResolver(
  Yup.object({
    warehouse: Yup.string().required("Required"),
    inventory: Yup.array().of(
      Yup.object({
        code: Yup.string().required("Required"),
        name: Yup.string().required("Required"),
        quantity: Yup.number()
          .typeError("Required")
          .min(0, "Should be positive")
          .required("Required"),
      }),
    ),
  }),
);

const FormWithArray = () => {
  const onSubmit = useCallback<OnSubmit<Values>>(
    ({ formControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const formControl = useForm<Values>({
    initialValues: {
      warehouse: "",
      inventory: useMemo(
        () =>
          new Array(100).fill(undefined).map((_, i) => ({
            name: `Item ${i}`,
            code: `c-${i}`,
            quantity: Math.round(Math.random() * 1000),
          })),
        [],
      ),
    },
    onSubmit,
    resolver,
  });

  const { remove } = useFieldArray({ formControl, name: "inventory" });

  return (
    <ChakraProvider>
      <VStack w="full" alignItems="flex-start">
        <Field
          rsfFormControl={formControl}
          rsfName="warehouse"
          rsfComponent={ChakraFormInput}
          label="Warehouse"
        />
        {formControl.values.inventory.map((_, i) => (
          <HStack key={i}>
            <Field
              rsfFormControl={formControl}
              rsfName={`inventory.${i}.name`}
              rsfComponent={ChakraFormInput}
              label="Name"
            />
            <Field
              rsfFormControl={formControl}
              rsfName={`inventory.${i}.code`}
              rsfComponent={ChakraFormInput}
              label="Code"
            />
            <Field
              rsfFormControl={formControl}
              rsfName={`inventory.${i}.quantity`}
              rsfComponent={ChakraFormInput}
              label="Quantity"
            />
            <Button
              size="md"
              minWidth="auto"
              variant="outline"
              colorScheme="red"
              onClick={() => remove(i)}
            >
              Delete
            </Button>
          </HStack>
        ))}
        <Button onClick={formControl.handleSubmit}>Submit</Button>
      </VStack>
    </ChakraProvider>
  );
};

export default FormWithArray;
