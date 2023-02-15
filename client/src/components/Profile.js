import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import avatar from "../assets/avatar_2.jpeg";
import convertToBase64 from "../helper/convert";

import { profileValidation } from "../helper/validate";
import { updateUser } from "../helper/helper";
import useFetch from "../hooks/fetch.hook";

import { useNavigate } from "react-router-dom";

function Profile() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successfully!</b>,
        error: <b>Could not Update</b>,
      });
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className="glass" style={{ width: "45%", paddingTop: "3em" }}>
          <div className=" flex flex-col items-center title">
            <h4 className="text-5xl font-bold ">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update the details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="py-4 flex justify-center items-center">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  alt="avatar"
                  className="profile"
                />
              </label>
              <input
                type="file"
                name="profile"
                id="profile"
                onChange={onUpload}
              />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <div className="flex w-3/4 gap-10">
                <input
                  type="text"
                  placeholder="First Name"
                  className="textbox"
                  {...formik.getFieldProps("firstName")}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="textbox"
                  {...formik.getFieldProps("lastName")}
                />
              </div>
              <div className="flex w-3/4 gap-10">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  className="textbox"
                  {...formik.getFieldProps("mobile")}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="textbox"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="textbox"
                {...formik.getFieldProps("address")}
              />

              <button type="submit" className="btn">
                Update
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                Comeback later{" "}
                <button
                  className="text-red-400 hover:underline"
                  onClick={userLogout}
                >
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
