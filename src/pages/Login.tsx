"use client";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "@/services/auth.services";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();
  const phone_numberStyle = classNames({
    "appearance-none border rounded-xl w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm":
      true,
    "border-gray-300": !errors.number,
    "border-red-500": errors.number,
    "text-red-500": errors.number,
  });
  const passwordStyle = classNames({
    "appearance-none border rounded-xl w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm":
      true,
    "border-gray-300": !errors.password,
    "border-red-500": errors.password,
    "text-red-500": errors.password,
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    const values = getValues();
    setLoading(true);
    return authService
      .login({
        phone_number: values.number,
        password: values.password,
      })
      .then(() => {
        navigate("/");
        setLoading(false);
      })
      .catch((err: any) => {
        setLoading(false);
        setError("number", {
          message: err?.message,
        });
      });
  };

  return (
    <main className="max-w-screen-2xl mx-auto p-8 h-screen">
      <div className="grid sm:grid-cols-2 gap-32 md:gap-64 h-full">
        <div className="m-auto">
          <h1 className="text-4xl font-bold text-blue-800">Welcome</h1>
          <p className="mt-4 text-sm text-gray-500 sm:w-4/6">
            Unlock the Agent Portals to get ready to make a difference.
          </p>
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={handleSubmit(() => handleLogin())}
          >
            <div>
              <label
                htmlFor="Phone number"
                className="block text-sm text-blue-800"
              >
                Phone number
              </label>
              <div className="mt-1">
                <input
                  {...register("number", {
                    required: "*Phone number is required",
                  })}
                  placeholder={"Phone number"}
                  name="number"
                  id="number"
                  className={phone_numberStyle}
                />
                {errors.number && (
                  <span className="text-xs text-red-500">
                    {errors.number.message as string}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="Password" className="block text-sm text-blue-800">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters or more",
                    },
                  })}
                  placeholder={"Password"}
                  name="password"
                  id="password"
                  className={passwordStyle}
                />

                {errors.password && (
                  <span className="text-xs text-red-500">
                    *{errors.password.message as string}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={classNames({
                "px-6 sm:px-8 bg-blue-800 text-white py-4 rounded-[12px] transition-all duration-300":
                  true,
                "opacity-50 cursor-not-allowed": loading,
              })}
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-400 text-center mt-28">
            © 2023 IHUUNDO ALL RIGHTS RESERVED.
          </p>
        </div>
        <div className="relative hidden sm:block">
          <img
            src={"/images/Art.png"}
            className="md:w-[90%] object-cover h-full rounded-2xl absolute"
            alt="ihundo saving"
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}
