import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormField from "../components/forms/AppFormField";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import Dropzone from "./Dropzone";

export default function EmployeeForm({ employee }: any) {
  const adminSchema = Yup.object().shape({
    names: Yup.string().required(),
    code: Yup.string().required(),
    role: Yup.string().required(),
    email: Yup.string().required(),
    photo: Yup.string().required(),
  });

  const initialValues = {
    names: employee?.names || "",
    code: employee?.code || "",
    role: employee?.role || "",
    email: employee?.email || "",
    photo: employee?.photo || "",
  };

  const formatToSave = (values) => {
    return {
      names: values.names,
      code: values.code,
      role: values.role,
      email: values.email,
      photo: values.photo || "",
    };
  };
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    const data = formatToSave(values);
    return (
      employee
        ? updateDoc(doc(firestore, "employees", employee.id), {
            ...data,
            updated_at: serverTimestamp(),
          })
        : addDoc(collection(firestore, "employees"), {
            ...data,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          })
    )
      .then(() => {
        toast.success(
          `Employee ${employee ? "updated" : "created"} successfully`
        );
        setSubmitting(false);
        navigate(`/employees`);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || err?.message);
        setStatus({ error: err?.response?.data?.message || err?.message });
        setSubmitting(false);
      });
  };

  return (
    <div
      className={` mx-auto bg-white rounded-md border border-s-purple-200 px-3 max-w-xl`}
    >
      <div className={`mx-auto px-3 max-w-xl my-6 `}>
        <Formik
          initialValues={initialValues}
          validationSchema={adminSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, touched, setFieldTouched }) => (
            <>
              <div className="mb-7">
                <h4 className="text-slate-800  mb-1 text-[16px] font-semibold capitalize">
                  {employee ? "Update" : "Create New"} employee
                </h4>
                <p className="text-[13.5px] font-medium text-gray-500">
                  here you can {employee ? "Update" : "Create New"} employee to
                  the Restorant.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 my-2">
                <AppFormField
                  name="names"
                  label="Employee names"
                  placeholder="Enter Employee name"
                />
                <AppFormField
                  name="role"
                  label="Employee role"
                  placeholder="Enter Employee category"
                />
              </div>
              <div className="space-y-3">
                <AppFormField
                  name="email"
                  placeholder={"Enter employee email"}
                  label="Email"
                />
              </div>{" "}
              <div className="space-y-3 mt-3">
                <AppFormField
                  name="code"
                  disabled={true}
                  placeholder={"Enter employee code"}
                  label="code"
                  type="number"
                />
                <a
                  onClick={() => {
                    setFieldValue(
                      "code",
                      Math.floor(100000 + Math.random() * 900000)
                    );
                  }}
                  className="font-semibold cursor-pointer underline text-sm capitalize text-blue-700"
                >
                  Generate code
                </a>
              </div>
              <div className="my-5">
                <span className="block text-sm font-medium text-blue-800">
                  Employee Profile photo.
                </span>
                <Dropzone
                  error={
                    errors["photo"] && touched["photo"] ? errors["photo"] : ""
                  }
                  label="Drag and drop or click here to upload employees photo"
                  file={values["photo"]}
                  onChange={(e: any) => {
                    console.log(e);
                    setFieldTouched("photo", true);
                    setFieldValue("photo", e);
                  }}
                />
              </div>
              <div className="flex mt-5 items-center justify-end">
                <SubmitButton>Submit</SubmitButton>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
}
