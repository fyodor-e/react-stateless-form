import { yupResolver } from "@hookform/resolvers/yup";
import { Field, OnSubmit, useForm, useSubform } from "react-stateless-form";
import * as Yup from "yup";
import SimpleInput from "./simpleInput";
import AddressForm, { Address, addressValidator } from "./AddressForm";
import { useCallback } from "react";

type Order = {
  orderNo: number;
  carrier: string;
  deliveryAddress: Address;
};

const resolver = yupResolver(
  Yup.object({
    orderNo: Yup.number().required("Required"),
    carrier: Yup.string().required("Required"),
    deliveryAddress: addressValidator,
  }),
);

const OrderForm = () => {
  const onSubmit = useCallback<OnSubmit<Order>>(
    ({ rsfFormControl: { values } }) => {
      alert(`Submitted form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const rsfFormControl = useForm<Order>({
    values: {
      orderNo: 0,
      carrier: "",
      deliveryAddress: {
        country: "",
        state: "",
        city: "",
        zipCode: "",
        street1: "",
        street2: undefined,
      },
    },
    resolver,
    onSubmit,
  });

  const addressrsfFormControl = useSubform({
    ...rsfFormControl,
    name: "deliveryAddress",
  });

  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="orderNo"
        rsfComponent={SimpleInput}
        label="Order No"
      />
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="carrier"
        rsfComponent={SimpleInput}
        label="Carrier"
      />
      <AddressForm subrsfFormControl={addressrsfFormControl} />
      <button onClick={rsfFormControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default OrderForm;
