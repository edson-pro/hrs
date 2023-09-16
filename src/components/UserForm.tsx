import { useState } from "react";
import Button from "../components/Button";
import PersonalInformation from "./UserForm/PersonalInformation";
import { Formik, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import BasicInfo from "./UserForm/BasicInfo";
import Overview from "./UserForm/Overview";
import FinancialInfomation from "./UserForm/FincancialInformation";
import IncomeInformation from "./UserForm/IncomeInformation";
import CommitmentInfo from "./UserForm/CommitmentInfo";
import SubmitButton from "./forms/SubmitButton";
import { useAuth } from "@/context/auth";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import AppFormStatus from "./forms/AppFormStatus";
import { useNavigate } from "react-router-dom";

export default function UserForm({ account }: any) {
  const [step, setstep] = useState(0);

  const personalInformationSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    phone_number: Yup.string().required(),
    nationality: Yup.string().required(),
    province: Yup.string().required(),
    district: Yup.string().required(),
    sector: Yup.string().required(),
  });

  const basicInfoSchema = Yup.object().shape({
    gender: Yup.string().required(),
    marital_status: Yup.string().required().label("Marital Status"),
    spouse_name: Yup.string().when("marital_status", {
      is: "married",
      then: (schema) => schema.required().label("Spouse name"),
    }),
    spouse_phone_number: Yup.string().when("marital_status", {
      is: "married",
      then: (schema) => schema.required().label("Spouse phone number"),
    }),
    spouse_address: Yup.string().when("marital_status", {
      is: "married",
      then: (schema) => schema.label("Spouse address"),
    }),
    spouse_id: Yup.string()
      .min(16)
      .max(16)
      .when("marital_status", {
        is: "married",
        then: (schema) => schema.required().label("Spouse ID number"),
      }),
    national_id: Yup.string()
      .required()
      .min(16)
      .max(16)
      .label("National ID number"),
    national_id_photo: Yup.string().required().label("National ID photo"),
  });

  console.log(account);

  const financialInfomation = Yup.object().shape({
    job_title: Yup.string().required().label("Job title"),
    job_sector: Yup.string().required().label("Job sector"),
    job_started_at: Yup.string().required().label("Started at"),
    job_working_days: Yup.string().required().label("Working days"),
    job_pay_date: Yup.string().required().label("Pay date"),
  });

  const incomesSchema = Yup.object().shape({
    incomes: Yup.array().of(
      Yup.object().shape({
        job_income: Yup.string().required().label("Source of income"),
        frequency: Yup.string().required().label("Frequency"),
        income_name: Yup.string().required().label("Mount you earn"),
      })
    ),
  });

  const commitmentInfo = Yup.object().shape({
    saving_goal: Yup.string().required().label("Saving goal"),
    saving_frequency: Yup.string().required().label("Saving frequency"),
    saving_principal: Yup.string().required().label("Saving principal"),
    commitment_type: Yup.string().required().label("Commitment type"),
    started_at: Yup.string().required().label("Started at"),
    end_at: Yup.string().required().label("End at"),
  });

  const steps = [
    {
      name: "personal information",
      schema: personalInformationSchema,
      initialValues: {
        first_name: account?.first_name || "",
        last_name: account?.last_name || "",
        phone_number: account?.phone_number || "",
        nationality: account?.nationality || "",
        province: account?.province || "",
        district: account?.district || "",
        sector: account?.sector || "",
      },
    },
    {
      name: "basic information",
      schema: basicInfoSchema,
      initialValues: {
        gender: account?.gender || "",
        marital_status: account?.marital_status || "",
        national_id: account?.national_id_number || "",
        national_id_photo:
          account?.national_id_photo?.path || account?.national_id_photo || "",
        spouse_name: account?.spouse_name || "",
        spouse_phone_number: account?.spouse_phone_number || "",
        spouse_address: account?.spouse_address || "",
        spouse_id: account?.spouse_id || "",
      },
    },
    {
      name: "financial information",
      schema: financialInfomation,
      initialValues: {
        job_title: account?.job_title || "",
        job_sector: account?.job_sector || "",
        job_started_at: account?.job_started_at || "",
        job_working_days: account?.job_working_days || "",
        company_location: account?.company_location || "",
        job_pay_date: account?.job_pay_date || "",
      },
    },
    {
      name: "income information",
      schema: incomesSchema,
      initialValues: {
        incomes: account
          ? account?.incomes?.map((e) => {
              return {
                job_income: e.job_income,
                frequency: e.frequency,
                income_name: e.income_name,
                amount_per_month: e.amount_per_month,
              };
            })
          : [
              {
                job_income: "",
                frequency: "",
                income_name: "",
                amount_per_month: "",
              },
            ],
      },
    },
    {
      name: "commitment information",
      schema: commitmentInfo,
      initialValues: {
        saving_goal: account?.saving_goal || "",
        saving_frequency: account?.saving_frequency || "",
        saving_principal: account?.saving_principal || "",
        commitment_type: account?.commitment_type || "",
        started_at: account?.started_at || "",
        end_at: account?.end_at || "",
      },
    },
    {
      name: "overview",
      schema: Yup.object().shape({}),
      initialValues: {},
    },
  ];

  const initialValues = steps.reduce((acc, step) => {
    return { ...acc, ...step.initialValues };
  }, {});

  const currentValidationSchema = steps[step].schema;

  const getStepValues = (values, stepInitials) => {
    const updatedStepInitials = { ...stepInitials };
    for (const key in values) {
      if (Object.hasOwnProperty.call(values, key)) {
        const value = values[key];
        if (updatedStepInitials.hasOwnProperty(key)) {
          updatedStepInitials[key] = value;
        }
      }
    }
    return updatedStepInitials;
  };

  const { user } = useAuth();

  const formatToSave = (values) => {
    return {
      first_name: values.first_name,
      last_name: values.last_name,
      phone_number: values.phone_number,
      gender: values.gender,
      nationality: values.nationality,
      province: values.province,
      district: values.district,
      sector: values.sector,
      created_by: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
      },
      birth: values.birth || "",
      marital_status: values.marital_status,
      national_id_number: values.national_id,
      national_id_photo:
        values.national_id_photo?.path || values.national_id_photo,
      job_title: values.job_title,
      job_sector: values.job_sector,
      job_started_at: values.job_started_at,
      end_at: values.end_at,
      job_working_days: values.job_working_days,
      company_location: values.company_location,
      job_pay_date: values.job_pay_date,
      incomes: values.incomes,
      spouse_name: values.spouse_name,
      spouse_phone_number: values.spouse_phone_number,
      spouse_address: values.spouse_address,
      spouse_id: values.spouse_id,
      saving_frequency: values.saving_frequency,
      saving_principal: values.saving_principal,
      commitment_type: values.commitment_type,
      saving_goal: values.saving_goal,
    };
  };
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    const data = formatToSave(values);
    const query = account
      ? api.put(`/api/accounts/${account.id}`, data)
      : api.post("/api/accounts", data);

    return query
      .then((e) => {
        console.log(e.data);
        toast.success(
          `Account ${account ? "updated" : "created"} successfully`
        );
        setSubmitting(false);
        navigate(`/accounts`);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err?.message);
        setStatus({ error: err?.response?.data?.message || err?.message });
        setSubmitting(false);
      });
  };

  const handleNext = ({ validateForm, values, setTouched }) => {
    if (step <= 4) {
      return validateForm(
        getStepValues(values, steps[step].initialValues)
      ).then((errors) => {
        if (Object.keys(errors).length) {
          setTouched(setNestedObjectValues(errors, true));
        }
        if (Object.keys(errors).length === 0) {
          setstep(step + 1);
        }
      });
    }
  };
  return (
    <div className={` mx-auto px-3 ${step === 5 ? "max-w-5xl" : "max-w-xl"}`}>
      {step !== 5 && (
        <div className="flex justify-center w-full items-center gap-3">
          <div className="w-[120px] h-[2px] border-t border-t-gray-400 border-dashed"></div>
          <div className="bg-gray-200 px-8 py-2 capitalize rounded-md text-sm font-medium text-gray-600">
            {steps[step].name}
          </div>
          <div className="w-[120px] h-[2px] border-t border-t-gray-400 border-dashed"></div>
        </div>
      )}
      <div
        className={`mx-auto px-3 ${
          step === 5 ? "max-w-7xl my-2" : "max-w-xl my-6 "
        }`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm, values, validateForm, setTouched }) => (
            <>
              <AppFormStatus className="mb-3" />
              {step === 0 ? (
                <PersonalInformation />
              ) : step === 1 ? (
                <BasicInfo />
              ) : step === 2 ? (
                <FinancialInfomation />
              ) : step === 3 ? (
                <IncomeInformation />
              ) : step === 4 ? (
                <CommitmentInfo />
              ) : step === 5 ? (
                <Overview />
              ) : (
                ""
              )}

              <div className="flex mt-5 items-center justify-between">
                <Button
                  onClick={() => {
                    if (step === 0) {
                      resetForm();
                    } else if (step !== 0) {
                      setstep(step - 1);
                    }
                  }}
                  className="!text-blue-800 !bg-gray-200 !focus:ring-gray-200"
                >
                  {step === 0 ? "Cancel" : "Previous"}
                </Button>

                {step === 5 ? (
                  <SubmitButton>
                    {!account ? "Create account" : "Update account"}
                  </SubmitButton>
                ) : (
                  <Button
                    loading={isSubmitting}
                    onClick={() => {
                      handleNext({ validateForm, values, setTouched });
                    }}
                  >
                    Next
                  </Button>
                )}
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
