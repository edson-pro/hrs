import { useFormikContext } from "formik";
import AppFormField from "../forms/AppFormField";
import AppFormCreatableSelect from "../forms/AppFormCreatableSelect";

export default function FinancialInfomation() {
  const { errors, values }: any = useFormikContext();

  console.log(errors);
  return (
    <div>
      <div className="mt-2 mb-8">
        <AppFormField
          name={`job_title`}
          label="Job title"
          placeholder="Enter his/her job title"
        />
      </div>
      <div className=" my-8">
        <AppFormCreatableSelect
          name={`job_sector`}
          placeholder={"Choose his job sector"}
          label="Job sector"
          options={[
            { label: "medical", value: "medical" },
            { label: "finance", value: "finance" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 my-8 ">
        <AppFormField
          name={`job_started_at`}
          placeholder={"choose job Start date"}
          label="Started at"
          type="date"
        />
        <AppFormField
          name={`job_working_days`}
          placeholder="job number of days"
          label="job working days"
          type="number"
        />
      </div>
      <div className="grid gap-3 my-4 ">
        <AppFormField
          name={`job_pay_date`}
          placeholder="select date"
          label="job Pay date"
          type="date"
        />
      </div>
    </div>
  );
}
