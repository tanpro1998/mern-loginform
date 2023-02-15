import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";

function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [{ isLoading, apiData, status, serverError }] =
    useFetch("createResetSession");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Resetting...",
        success: <b>Reset Successfully</b>,
        error: <b>Could not reset</b>,
      });
      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  if (isLoading) return <h1 className=" text-2xl font-bold">isLoading...</h1>;
  if (serverError)
    return <h1 className="text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true} />;
  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className="glass" style={{ width: "50%" }}>
          <div className=" flex flex-col items-center title">
            <h4 className="text-5xl font-bold ">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>
          <form className="py-20" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6 items-center">
              <input
                type="password"
                placeholder="New Password"
                className="textbox"
                {...formik.getFieldProps("password")}
              />
              <input
                type="password"
                placeholder="Repeat Password"
                className="textbox"
                {...formik.getFieldProps("confirm_pwd")}
              />
              <button type="submit" className="btn">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Reset;
