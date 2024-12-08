/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  OnSubmit,
  useForm,
  Field,
  ConvertHook,
  getIn,
} from "react-stateless-form";
import { useCallback } from "react";
import DatePicker, { DatePickerProps } from "react-datepicker";
import Select, { GroupBase, Props as ReactSelectProps } from "react-select";
import "react-datepicker/dist/react-datepicker.css";

type Color = { label: string; value: string };

type Values = {
  date: Date | null;
  color: Color;
};

const colors: Color[] = [
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Yellow", value: "yellow" },
];

const useReactSelectConvert: ConvertHook<
  any,
  Pick<
    ReactSelectProps<unknown, false, GroupBase<unknown>>,
    "value" | "onChange"
  >
> = ({ rsfFormControl: { values, setFieldValue }, rsfName }) => {
  const value = getIn<any>({ name: rsfName, values });
  const onChange = useCallback<
    NonNullable<
      ReactSelectProps<unknown, false, GroupBase<unknown>>["onChange"]
    >
  >(
    (value) => {
      setFieldValue<any>(rsfName, value);
    },
    [rsfName, setFieldValue],
  );

  return {
    value,
    onChange,
  };
};

const useDatePickerConvert: ConvertHook<
  any,
  {
    selected: Date | null;
    onChange: NonNullable<DatePickerProps["onChange"]>;
    value?: undefined;
  }
> = ({ rsfFormControl: { values, setFieldValue }, rsfName }) => {
  const selected = getIn<any>({ name: rsfName, values });
  const onChange = useCallback<NonNullable<DatePickerProps["onChange"]>>(
    (value: any) => {
      setFieldValue<any>(rsfName, value);
    },
    [rsfName, setFieldValue],
  );

  return {
    selected,
    onChange,
  };
};

const CustomUseConvert = () => {
  const onSubmit = useCallback<OnSubmit<Values>>(
    ({ rsfFormControl: { values } }) => {
      alert(`Form values: \n ${JSON.stringify(values)}`);
    },
    [],
  );

  const rsfFormControl = useForm({
    initialValues: { date: new Date(), color: colors[0] },
    onSubmit,
  });

  return (
    <div
      style={{
        gap: "7px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label>Date</label>
      <Field
        useConvert={useDatePickerConvert}
        rsfFormControl={rsfFormControl}
        rsfName="date"
        rsfComponent={DatePicker}
      />
      <label>Color</label>
      <Field
        useConvert={useReactSelectConvert}
        rsfFormControl={rsfFormControl}
        rsfName="color"
        rsfComponent={Select<Color>}
        options={colors}
      />
      {!rsfFormControl.isValid && (
        <>
          <div css={{ color: "red" }}>Form have errors:</div>
          <div css={{ color: "red" }}>
            {JSON.stringify(rsfFormControl.errors)}
          </div>
        </>
      )}
      <button onClick={rsfFormControl.handleSubmit}>Submit</button>
    </div>
  );
};

export default CustomUseConvert;
