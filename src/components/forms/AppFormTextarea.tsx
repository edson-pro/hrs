import { useFormikContext } from "formik";
import Textarea from "../Textarea";

export default function AppFormTextarea({ name, ...other }) {
  const { handleChange, values, errors, handleBlur, touched }: any =
    useFormikContext();
  return (
    <Textarea
      error={errors[name] && touched[name] ? errors[name] : ""}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
      name={name}
      {...other}
    />
  );
}
