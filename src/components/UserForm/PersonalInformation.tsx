import "react-phone-number-input/style.css";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import AppFormField from "../forms/AppFormField";
import AppFormSelect from "../forms/AppFormSelect";
import AppFormPhone from "../forms/AppFormPhone";

export default function PersonalInformation() {
  const { values }: any = useFormikContext();

  const [locations, setlocations] = useState<any>();

  const fetchLocations = async () => {
    const res = await fetch("/locations.json");
    const data = await res.json();
    setlocations(data);
  };

  const getProvinces = () => {
    return Object.keys(locations);
  };

  console.log(locations);
  const getDistricts = (province: string) => {
    try {
      const data = locations[province];
      return Object.keys(data);
    } catch (error) {
      return [];
    }
  };

  const getSectors = (province: string, district: string) => {
    try {
      const data = locations[province][district];
      return Object.keys(data);
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-4 my-2">
          <AppFormField
            name="first_name"
            label="First Name"
            placeholder="Enter his/her first name"
          />
          <AppFormField
            name="last_name"
            label="Last Name"
            placeholder="Enter his/her lasr name"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 my-8 ">
          <AppFormSelect
            name="nationality"
            placeholder={"choose nationlity"}
            label="Nationality"
            options={["rwanda"]}
          />
          <AppFormSelect
            name="province"
            placeholder="choose province"
            label="Province"
            disabled={!values["nationality"]}
            options={locations ? getProvinces() : []}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 my-8 ">
          <AppFormSelect
            name="district"
            placeholder={"choose district"}
            label="District"
            options={locations ? getDistricts(values["province"] || "") : []}
            disabled={!values["province"]}
          />
          <AppFormSelect
            name="sector"
            placeholder="choose sector"
            label="Sector"
            options={
              locations
                ? getSectors(values["province"] || "", values["district"] || "")
                : []
            }
            disabled={!values["district"]}
          />
        </div>
        <div className=" my-8 ">
          <AppFormPhone
            name="phone_number"
            label={"Phone number"}
            placeholder="Enter phone number"
            defaultCountry="RW"
          />
        </div>
      </div>
    </div>
  );
}
