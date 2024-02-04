import { Field, OnSubmit, useForm, UseValidate } from "react-stateless-form";
import * as Yup from "yup";
import { FC, useCallback, useEffect, useMemo } from "react";
import SimpleInput from "./SimpleInput123";
import { yupResolver } from "@hookform/resolvers/yup";
import { throttle } from "throttle-debounce";

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

const useValidate: UseValidate<Address> = ({
  rsfFormControl: { values, setFieldError },
  resolver,
  context,
  criteriaMode,
}) => {
  const validator = useCallback(
    async (values: Address) => {
      const { errors } = resolver
        ? await resolver(values, context, {
            criteriaMode,
            shouldUseNativeValidation: false,
            fields: {},
          })
        : { errors: {} };
      return errors;
    },
    [resolver, context, criteriaMode],
  );

  const throttleFn = useMemo(
    () =>
      throttle(5000, async (values: Address) => {
        const newErrors = await validator(values);
        setFieldError("", newErrors);
      }),
    [validator, setFieldError],
  );

  useEffect(() => {
    throttleFn(values);
  }, [throttleFn, values]);

  return useCallback(() => validator(values), [validator, values]);
};

const AddressForm: FC = () => {
  const onSubmit = useCallback<OnSubmit<Address>>(
    ({ rsfFormControl: { values } }) => {
      alert(`Submitted form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const rsfFormControl = useForm<Address>({
    values: {
      country: "",
      state: "",
      city: "",
      zipCode: "",
      street1: "",
      street2: undefined,
    },
    resolver,
    onSubmit,
    useValidate,
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
        rsfFormControl={rsfFormControl}
        rsfName="country"
        rsfComponent={SimpleInput}
        label="Country"
        css={{ gridColumn: 1, gridRow: 1 }}
      />
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="state"
        rsfComponent={SimpleInput}
        label="State"
        css={{ gridColumn: 1, gridRow: 2 }}
      />
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="city"
        rsfComponent={SimpleInput}
        label="City"
        css={{ gridColumn: 1, gridRow: 3 }}
      />
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="zipCode"
        rsfComponent={SimpleInput}
        label="Zip Code"
        css={{ gridColumn: 2, gridRow: 1 }}
      />
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="street1"
        rsfComponent={SimpleInput}
        label="Street Address 1"
        css={{ gridColumn: 2, gridRow: 2 }}
      />
      <Field
        rsfFormControl={rsfFormControl}
        rsfName="street2"
        rsfComponent={SimpleInput}
        label="Street Address 2"
        css={{ gridColumn: 2, gridRow: 3 }}
      />
      <button onClick={rsfFormControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default AddressForm;
