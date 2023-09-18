import { Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "./forms/SubmitButton";
import AppFormField from "./forms/AppFormField";
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

export default function RestorantForm({ restorant }: any) {
  const adminSchema = Yup.object().shape({
    name: Yup.string().required(),
    location: Yup.string().required(),
    email: Yup.string().email().required(),
  });

  const initialValues = {
    name: restorant?.name || "",
    location: restorant?.location || "",
    email: restorant?.email || "",
  };

  const formatToSave = (values) => {
    return {
      name: values.name,
      location: values.location,
      email: values.email,
      revenue: Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000,
    };
  };

  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    const data = formatToSave(values);
    return (
      restorant
        ? updateDoc(doc(firestore, "restorants", restorant.id), {
            ...data,
            updated_at: serverTimestamp(),
          })
        : addDoc(collection(firestore, "restorants"), {
            ...data,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          })
    )
      .then(() => {
        toast.success(
          `Restorants ${restorant ? "updated" : "created"} successfully`
        );
        setSubmitting(false);
        navigate(`/restorants`);
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
          {() => (
            <>
              <div className="mb-7">
                <h4 className="text-slate-800  mb-1 text-[16px] font-semibold capitalize">
                  {restorant ? "Update" : "Create New"} restorant
                </h4>
                <p className="text-[13.5px] font-medium text-gray-500">
                  here you can {restorant ? "Update" : "Create New"} restorant
                  to the Restorant.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 my-2">
                <AppFormField
                  name="name"
                  label="restorant name"
                  placeholder="Enter restorant name"
                />
                <AppFormField
                  name="location"
                  label="restorant location"
                  placeholder="Enter restorant category"
                />
                <AppFormField
                  name="email"
                  label="restorant email address"
                  placeholder="Enter restorant email"
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
