import { useFormikContext } from "formik";
import CreatableSelect from "react-select/creatable";

export default function AppFormCreatableSelect({
  label,
  placeholder,
  options,
  error,
  onChange,
  name,
  ...rest
}: any) {
  const { values, errors, handleBlur, touched, setFieldValue } =
    useFormikContext();
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-yellow-500"
      >
        {label}
      </label>
      <CreatableSelect
        className="mt-2"
        onBlur={handleBlur}
        classNames={{
          input: () => `text-sm`,
          option: () => `!text-sm capitalize`,
          container: () => `mt-1 `,
          valueContainer: () => `!px-3`,
          placeholder: () => `text-sm text-slate-500`,
          control: () =>
            `py-1 ${
              errors[name] && touched[name] ? "!border-red-500 !border" : ""
            } `,
        }}
        placeholder={placeholder}
        value={
          options.find((e: any) => e?.value === values[name]) || values[name]
            ? {
                label: values[name],
                value: values[name],
              }
            : ""
        }
        onChange={(e: any) => {
          console.log(e);
          setFieldValue(name, e?.value || "");
        }}
        isClearable
        options={options}
        {...rest}
      />
      {errors[name] && touched[name] && (
        <span className="block text-[13px] mt-2 capitalize font-medium text-red-500">
          {errors[name]}
        </span>
      )}
    </div>
  );
}
