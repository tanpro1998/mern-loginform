import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { usernameValidate } from "../helper/validate";

import { useAuthStore } from "../store/store";
import { useNavigate } from "react-router-dom";

function Username() {
  const navigate = useNavigate()
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password")
    },
  });
  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className="glass">
          <div className=" flex flex-col items-center title">
            <h4 className="text-5xl font-bold ">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              <UserCircleIcon className=" h-[150px] w-[150px] text-blue-400 profile" />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <input
                type="text"
                placeholder="Username"
                className="textbox"
                {...formik.getFieldProps("username")}
              />
              <button type="submit" className="btn">
                Let's Go
              </button>
            </div>
            <div className="text-center mt-5">
              <span>
                Not a Member{" "}
                <a href="/register" className="text-red-400 hover:underline">
                  Register Now
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;
