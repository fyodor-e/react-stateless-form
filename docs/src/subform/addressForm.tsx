import { yupResolver } from "@hookform/resolvers/yup";
import { Field, SubFormType, useForm } from "react-stateless-form";
import * as Yup from "yup";
import SimpleInput from "./simpleInput";
import { FC } from "react";

export type Address = {
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

type Props = SubFormType<Address>;

const AddressForm: FC<Props> = (formProps) => {
  const formControl = useForm<Address>({
    ...formProps,
    resolver,
  });

  return (
    <div
      css={{
        width: "100%",
        display: "grid",
        gridTemplateRows: "repeat(4, auto)",
        gridTemplateColumns: "auto auto",
        gap: "10px",
      }}
    >
      <Field
        formControl={formControl}
        rsfName="country"
        rsfComponent={SimpleInput}
        label="Country"
        css={{ gridColumn: 1, gridRow: 1 }}
      />
      <Field
        formControl={formControl}
        rsfName="state"
        rsfComponent={SimpleInput}
        label="State"
        css={{ gridColumn: 1, gridRow: 2 }}
      />
      <Field
        formControl={formControl}
        rsfName="city"
        rsfComponent={SimpleInput}
        label="City"
        css={{ gridColumn: 1, gridRow: 3 }}
      />
      <Field
        formControl={formControl}
        rsfName="zipCode"
        rsfComponent={SimpleInput}
        label="Zip Code"
        css={{ gridColumn: 2, gridRow: 1 }}
      />
      <Field
        formControl={formControl}
        rsfName="street1"
        rsfComponent={SimpleInput}
        label="Street Address 1"
        css={{ gridColumn: 2, gridRow: 2 }}
      />
      <Field
        formControl={formControl}
        rsfName="street2"
        rsfComponent={SimpleInput}
        label="Street Address 2"
        css={{ gridColumn: 2, gridRow: 3 }}
      />
    </div>
  );
};

export default AddressForm;
