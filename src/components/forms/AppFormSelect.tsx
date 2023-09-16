import { useFormikContext } from "formik";
import Select from "../Select";

export default function AppFormSelect({ name, ...other }) {
  const { handleChange, values, errors, handleBlur, touched }: any =
    useFormikContext();
  return (
    <Select
      error={errors[name] && touched[name] ? errors[name] : ""}
      onChange={handleChange}
      onBlur={handleBlur}
      name={name}
      value={values[name]}
      {...other}
    />
  );
}
