import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import avatar from "../assets/avatar_2.jpeg";
import convertToBase64 from "../helper/convert";

import { registerValidation } from "../helper/validate";
import { registerUser } from "../helper/helper";

import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully!</b>,
        error: <b>Could not Register</b>,
      });
      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };
  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className="glass" style={{ width: "45%", paddingTop: "3em" }}>
          <div className=" flex flex-col items-center title">
            <h4 className="text-5xl font-bold ">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="py-4 flex justify-center items-center">
              <label htmlFor="profile">
                <img src={file || avatar} alt="avatar" className="profile" />
              </label>
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={onUpload}
              />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <input
                type="text"
                placeholder="Email"
                className="textbox"
                {...formik.getFieldProps("email")}
              />
              <input
                type="text"
                placeholder="Username"
                className="textbox"
                {...formik.getFieldProps("username")}
              />
              <input
                type="password"
                placeholder="Password"
                className="textbox"
                {...formik.getFieldProps("password")}
              />
              <button type="submit" className="btn">
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                Already Register{" "}
                <a href="/register" className="text-red-400 hover:underline">
                  Login Now
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
