import AppFormSelect from "../forms/AppFormSelect";
import AppFormField from "../forms/AppFormField";

export default function CommitmentInfo() {
  return (
    <div>
      <div>
        <div className="mt-2 mb-8">
          <AppFormField
            name={`saving_goal`}
            label="saving goal"
            type="number"
            placeholder="Enter his/her saving goal"
          />
        </div>
        <div className=" my-8">
          <AppFormSelect
            name={`saving_frequency`}
            placeholder={"Choose his saving frequency"}
            label="saving frequency"
            options={["weekly", "monthly", "daily"]}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 my-8 ">
          <AppFormSelect
            name={`saving_principal`}
            placeholder={"600frw"}
            label="saving principal"
            options={["600frw", "620frw"]}
          />
          <AppFormSelect
            name={`commitment_type`}
            placeholder="commitment type"
            label="commitment type"
            options={["Flexible", "Group", "Target"]}
          />
        </div>
        <div className="grid grid-cols-2 gap-3 my-4 ">
          <AppFormField
            name={`started_at`}
            placeholder={"started at"}
            label="started at"
            type="date"
          />
          <AppFormField
            name={`end_at`}
            placeholder="end at"
            label="end at"
            type="date"
          />
        </div>
      </div>
    </div>
  );
}
