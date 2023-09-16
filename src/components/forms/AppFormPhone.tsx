import { useFormikContext } from "formik";
import PhoneInput from "react-phone-number-input";

export default function AppFormPhone({ name, label, ...other }) {
  const { values, errors, handleBlur, touched, setFieldValue }: any =
    useFormikContext();
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-blue-800">
        {label}
      </label>
      <div
        className={`border ${
          errors[name] && touched[name]
            ? "focus:ring-red-500 focus:border-red-500 border border-red-500"
            : "focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 "
        }  px-3 py-3 rounded-md text-sm`}
      >
        <div>
          <PhoneInput
            onChange={(e) => {
              setFieldValue(name, e);
            }}
            value={values.phone_number}
            onBlur={handleBlur}
            defaultCountry="RW"
            countries={["RW"]}
            name={name}
            {...other}
          />
        </div>
      </div>
      {errors[name] && touched[name] && (
        <span className="block text-[13px] mt-2 capitalize font-medium text-red-500">
          {errors[name]}
        </span>
      )}
    </div>
  );
}
