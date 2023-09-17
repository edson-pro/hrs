import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import authServices from "../services/auth.services";
import AppFormStatus from "../components/forms/AppFormStatus";

export default function page() {
  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const [agreeded, setagreeded] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (values, { setSubmitting, setStatus }) => {
    return authServices
      .signIn({
        email: values.email,
        password: values.password,
      })
      .then(() => {
        setTimeout(() => {
          navigate("/");
          setSubmitting(false);
        }, 1000);
      })
      .catch((err: any) => {
        setSubmitting(false);
        setStatus({
          error: err?.message,
        });
      });
  };

  return (
    <div>
      <div className="bg-white max-w-[500px] my-24 mx-auto p-2 rounded-md">
        <div className="rounded-md p-4 bg-white py-4">
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {() => (
              <div>
                <div className="flex pt-3 mb-2 items-center justify-center gap-3 flex-col">
                  <h4 className="text-[17px] text-slate-700 font-semibold">
                    Login First to Your Account
                  </h4>
                  <p className="text-sm text-center font-medium leading-8 text-slate-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    <br />
                    Eius similique asperiores.
                  </p>
                </div>
                <div className="space-y-3 mt-6">
                  <AppFormStatus />
                  <div>
                    <AppFormField
                      name={"email"}
                      placeholder="Enter your email"
                      label="Enter email"
                    />
                  </div>
                  <div>
                    <AppFormField
                      name={"password"}
                      placeholder="Enter your password"
                      label="Enter password"
                    />
                  </div>
                  <div className="py-0">
                    <div className="flex items-center gap-3">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        checked={agreeded}
                        onChange={() => setagreeded(!agreeded)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-[13px] font-medium text-slate-500"
                      >
                        I agree terms & condtions
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <SubmitButton className="!w-full" fullWidth>
                      Login your account
                    </SubmitButton>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
