import Dropzone from "../Dropzone";
import { useFormikContext } from "formik";
import AppFormSelect from "../forms/AppFormSelect";
import AppFormField from "../forms/AppFormField";
import { useState } from "react";
import AppFormPhone from "../forms/AppFormPhone";

export default function BasicInfo() {
  const { values, errors, touched, setFieldValue, setFieldTouched }: any =
    useFormikContext();

  const [differentAddress, setdifferentAddress] = useState(false);
  return (
    <div>
      <div className=" my-8">
        <AppFormSelect
          name="gender"
          placeholder={"Gender"}
          label="Select his/her Gender"
          options={["male", "female"]}
        />
      </div>
      <div className=" my-8">
        <AppFormSelect
          name="marital_status"
          placeholder={"Select his/her status"}
          label="Marital Status"
          options={["single", "married"]}
        />
      </div>
      {values.marital_status === "married" && (
        <div className="ml-3 p-4 pt-3 border space-y-3 border-slate-200 rounded-md my-0">
          <div>
            <h4 className="font-semibold text-slate-700 text-sm capitalize mb-4">
              Spouse details
            </h4>
          </div>
          <div>
            <AppFormField
              name="spouse_name"
              placeholder={"Enter his/her spouse name"}
              label="Spouse Name"
            />
          </div>
          <div>
            <AppFormPhone
              name="spouse_phone_number"
              placeholder={"Enter his/her phone number"}
              label="Spouse Phone number"
            />
          </div>
          <div>
            <AppFormField
              name="spouse_id"
              placeholder={"Enter spouse id number"}
              label="Spouse id number"
              type="number"
            />
          </div>
          <div className={`${differentAddress ? "" : "hidden"}`}>
            <AppFormField
              name="spouse_address"
              placeholder={"Enter spouse address"}
              label="Spouse address"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="sameAddress"
              type="checkbox"
              checked={differentAddress}
              onChange={() => {
                setdifferentAddress(!differentAddress);
                setFieldValue("spouse_address", values.address);
              }}
            />
            <label
              htmlFor="sameAddress"
              className="text-[13px] font-medium text-slate-500"
            >
              We live in different addresses.
            </label>
          </div>
        </div>
      )}
      <div className="my-8 ">
        <AppFormField
          name="national_id"
          placeholder={"Enter his/her national ID number"}
          label="National ID number"
          type="number"
        />
      </div>
      <div className="my-5">
        <span className="block text-sm font-medium text-blue-800">
          National ID Copy
        </span>
        <Dropzone
          error={
            errors["national_id_photo"] && touched["national_id_photo"]
              ? errors["national_id_photo"]
              : ""
          }
          file={values["national_id_photo"]}
          onChange={(e: any) => {
            setFieldTouched("national_id_photo", true);
            setFieldValue("national_id_photo", e);
          }}
        />
      </div>
    </div>
  );
}
