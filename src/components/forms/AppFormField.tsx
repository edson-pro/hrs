import { useFormikContext } from "formik";
import Input from "../Input";

export default function AppFormField({ name, ...other }) {
  const { handleChange, values, errors, handleBlur, touched }: any =
    useFormikContext();
  return (
    <Input
      error={errors[name] && touched[name] ? errors[name] : ""}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
      name={name}
      {...other}
    />
  );
}
