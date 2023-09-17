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
import AppFormTextarea from "./forms/AppFormTextarea";
import Dropzone from "./Dropzone";

export default function MenuForm({ menu }: any) {
  const adminSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    image: Yup.string().optional(),
    price: Yup.number().required(),
    ingredients: Yup.string().required(),
    availability: Yup.boolean().default(true),
  });

  const initialValues = {
    name: menu?.name || "",
    description: menu?.description || "",
    category: menu?.category || "",
    price: menu?.price || "",
    ingredients: menu?.ingredients.join(",") || "",
    availability: menu ? menu?.availability : true,
    image: menu?.image || "",
  };

  const formatToSave = (values) => {
    return {
      name: values.name,
      description: values.description,
      category: values.category,
      price: values.price,
      ingredients: values.ingredients.split(",").map((e) => e.trim()),
      availability: values.availability,
      image: values.image || "",
    };
  };
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    const data = formatToSave(values);
    return (
      menu
        ? updateDoc(doc(firestore, "menus", menu.id), {
            ...data,
            updated_at: serverTimestamp(),
          })
        : addDoc(collection(firestore, "menus"), {
            ...data,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
          })
    )
      .then(() => {
        toast.success(`Menu ${menu ? "updated" : "created"} successfully`);
        setSubmitting(false);
        navigate(`/menus`);
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
                  {menu ? "Update" : "Create New"} menu
                </h4>
                <p className="text-[13.5px] font-medium text-gray-500">
                  here you can {menu ? "Update" : "Create New"} menu to the
                  Restorant.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 my-2">
                <AppFormField
                  name="name"
                  label="Menu name"
                  placeholder="Enter menu name"
                />
                <AppFormField
                  name="category"
                  label="Menu Category"
                  placeholder="Enter menu category"
                />
              </div>

              <div className="gap-3 my-3 ">
                <AppFormTextarea
                  rows={4}
                  name="description"
                  label="Menu description"
                  placeholder="Enter menu description"
                />
              </div>
              <div className="space-y-3">
                <AppFormField
                  name="price"
                  placeholder={"Enter menu price"}
                  label="Price"
                  type="number"
                />
                <AppFormField
                  name="ingredients"
                  placeholder="Enter menu ingredients(separated by comma)"
                  label="Ingredients"
                />
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    required
                    id="av"
                    checked={values?.availability}
                    onChange={() => {
                      setFieldValue("availability", !values.availability);
                    }}
                  />
                  <label
                    htmlFor="av"
                    className="text-[13px] font-medium text-slate-500"
                  >
                    Menu is available.
                  </label>
                </div>
              </div>

              <div className="my-5">
                <span className="block text-sm font-medium text-blue-800">
                  Menu Image
                </span>
                <Dropzone
                  error={
                    errors["image"] && touched["image"] ? errors["image"] : ""
                  }
                  label="Drag and drop or click here to upload menu image"
                  file={values["image"]}
                  onChange={(e: any) => {
                    setFieldTouched("image", true);
                    setFieldValue("image", e);
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
