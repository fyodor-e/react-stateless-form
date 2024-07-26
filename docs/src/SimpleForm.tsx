import { useForm } from "@react-stateless-form/use-form";
import { Field } from "@react-stateless-form/field";

const SimpleForm = () => {
  const formControl = useForm({ values: { firstName: "", lastName: "" } });
  return (
    <div>
      <h1>Simple Form</h1>
      <Field
        formControl={formControl}
        rsfName="firstName"
        rsfComponent={input}
      />
    </div>
  );
};

export default SimpleForm;
