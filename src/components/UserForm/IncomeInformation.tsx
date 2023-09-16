import { Plus, XCircle } from "react-feather";
import { useFormikContext } from "formik";
import AppFormField from "../forms/AppFormField";
import AppFormSelect from "../forms/AppFormSelect";

export default function IncomeInformation() {
  const { values, errors, touched, setFieldValue }: any = useFormikContext();

  const deleteIncome = (i: number) => {
    const incomes = values["incomes"].filter(
      (e: any, index: number) => index !== i
    );
    setFieldValue("incomes", incomes);
  };

  const addIncome = () => {
    setFieldValue("incomes", [
      ...values["incomes"],
      {
        job_income: "",
        frequency: "",
        income_name: "",
        amount_per_month: "",
      },
    ]);
  };

  return (
    <div>
      {values["incomes"].map((e, i) => {
        return (
          <div key={i} className="border mt-6 border-gray-300 p-4 rounded-md">
            {values["incomes"].length > 1 && (
              <div className="flex items-center justify-end">
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    deleteIncome(i);
                  }}
                >
                  <XCircle size={22} className="text-red-500" />
                </a>
              </div>
            )}
            <div className="mt-2 mb-8">
              <AppFormField
                name={`incomes[${i}].job_income`}
                value={values[`incomes`][i]?.job_income}
                error={
                  errors[`incomes`]
                    ? errors[`incomes`][i]?.job_income &&
                      touched[`incomes`] &&
                      touched[`incomes`][i]?.job_income
                      ? errors[`incomes`][i]?.job_income
                      : ""
                    : ""
                }
                label="Source of income"
                placeholder="Enter his/her Source of income"
              />
            </div>
            <div className=" my-8">
              <AppFormSelect
                name={`incomes[${i}].frequency`}
                value={values[`incomes`][i]?.frequency}
                error={
                  errors[`incomes`]
                    ? errors[`incomes`][i]?.frequency &&
                      touched[`incomes`] &&
                      touched[`incomes`][i]?.frequency
                      ? errors[`incomes`][i]?.frequency
                      : ""
                    : ""
                }
                placeholder={"Choose frequency"}
                label="frequency"
                options={["monthly", "weekly", "daily"]}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 my-8 ">
              <AppFormField
                value={values[`incomes`][i]?.income_name}
                name={`incomes[${i}].income_name`}
                error={
                  errors[`incomes`]
                    ? errors[`incomes`][i]?.income_name &&
                      touched[`incomes`] &&
                      touched[`incomes`][i]?.income_name
                      ? errors[`incomes`][i]?.income_name
                      : ""
                    : ""
                }
                disabled={!values[`incomes`][i]?.frequency}
                placeholder={`Mount you earn ${
                  values.incomes[i].frequency &&
                  "per " + values.incomes[i].frequency
                }`}
                label={`Mount you earn ${
                  values.incomes[i].frequency &&
                  "per " + values.incomes[i].frequency
                }`}
              />
              <AppFormField
                value={`${
                  values[`incomes`][i]?.frequency === "monthly"
                    ? values[`incomes`][i]?.income_name
                    : values[`incomes`][i]?.frequency === "weekly"
                    ? values[`incomes`][i]?.income_name * 4
                    : values[`incomes`][i]?.income_name * 30
                } Frw`}
                name={`incomes[${i}].amount_per_month`}
                error={
                  errors[`incomes`]
                    ? errors[`incomes`][i]?.amount_per_month &&
                      touched[`incomes`] &&
                      touched[`incomes`][i]?.amount_per_month
                      ? errors[`incomes`][i]?.amount_per_month
                      : ""
                    : ""
                }
                disabled={true}
                readOnly={true}
                placeholder="amount per month"
                label="Amount per month"
                type="text"
              />
            </div>
          </div>
        );
      })}

      <a
        onClick={() => {
          addIncome();
        }}
        className="flex items-center mt-5 font-medium rounded-md mb-4 cursor-pointer hover:bg-gray-300 gap-3 py-3 text-sm text-gray-500 bg-gray-200 justify-center"
      >
        <Plus size={16} />
        <span>Add Other Incomes</span>
      </a>
    </div>
  );
}
