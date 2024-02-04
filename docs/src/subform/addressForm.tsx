import { Field, rsfFormControl } from "react-stateless-form";
import * as Yup from "yup";
import { FC } from "react";
import SimpleInput from "./simpleInput";

export type Address = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street1: string;
  street2?: string | undefined;
};

export const addressValidator = Yup.object({
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required"),
  street1: Yup.string().required("Required"),
  street2: Yup.string(),
});

type Props = {
  subrsfFormControl: Omit<rsfFormControl<Address>, "handleSubmit">;
};

const AddressForm: FC<Props> = ({ subrsfFormControl }) => {
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
        rsfFormControl={subrsfFormControl}
        rsfName="country"
        rsfComponent={SimpleInput}
        label="Country"
        css={{ gridColumn: 1, gridRow: 1 }}
      />
      <Field
        rsfFormControl={subrsfFormControl}
        rsfName="state"
        rsfComponent={SimpleInput}
        label="State"
        css={{ gridColumn: 1, gridRow: 2 }}
      />
      <Field
        rsfFormControl={subrsfFormControl}
        rsfName="city"
        rsfComponent={SimpleInput}
        label="City"
        css={{ gridColumn: 1, gridRow: 3 }}
      />
      <Field
        rsfFormControl={subrsfFormControl}
        rsfName="zipCode"
        rsfComponent={SimpleInput}
        label="Zip Code"
        css={{ gridColumn: 2, gridRow: 1 }}
      />
      <Field
        rsfFormControl={subrsfFormControl}
        rsfName="street1"
        rsfComponent={SimpleInput}
        label="Street Address 1"
        css={{ gridColumn: 2, gridRow: 2 }}
      />
      <Field
        rsfFormControl={subrsfFormControl}
        rsfName="street2"
        rsfComponent={SimpleInput}
        label="Street Address 2"
        css={{ gridColumn: 2, gridRow: 3 }}
      />
    </div>
  );
};

export default AddressForm;
