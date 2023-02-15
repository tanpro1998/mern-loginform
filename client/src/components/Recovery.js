import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { passwordValidate } from "../helper/validate";

function Recovery() {
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className="glass">
          <div className=" flex flex-col items-center title">
            <h4 className="text-5xl font-bold ">Revovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <UserCircleIcon className=" h-[150px] w-[150px] text-blue-400 profile" />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <span className="text-gray-500 text-center py-4 text-sm">
                Enter 6 digit OTP sent to your email.
              </span>
              <input
                type="password"
                placeholder="OTP Code"
                className="textbox"
                {...formik.getFieldProps("password")}
              />
              <button type="submit" className="btn">
                Sign In
              </button>
            </div>
            <div className="text-center mt-5">
              <span>
                Can't get OTP?{" "}
                <a href="/recovery" className="text-red-400 hover:underline">
                  Resend
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
