import Button from "../Button";
import { useFormikContext } from "formik";

export default function SubmitButton({ children, ...other }) {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <Button loading={isSubmitting} onClick={handleSubmit} {...other}>
      {children}
    </Button>
  );
}
