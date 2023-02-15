import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { verifyPassword } from "../helper/helper";
import { useAuthStore } from "../store/store";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useNavigate, Link } from "react-router-dom";

import Avatar from "../assets/avatar_2.jpeg";

function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully</b>,
        error: <b>Password Not Match</b>,
      });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/profile");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading...</h1>;
  if (serverError)
    return (
      <h1 className="text-2xl text-red-500">Error: {serverError.message}</h1>
    );

  return (
    <div className=" container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className="glass">
          <div className=" flex flex-col items-center title">
            <h4 className="text-5xl font-bold ">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center py-4">
              {/* <UserCircleIcon className=" h-[150px] w-[150px] text-blue-400 profile" /> */}
              <img
                src={apiData?.profile || Avatar}
                alt="avatar"
                className=" text-blue-400 profile"
              />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <input
                type="password"
                placeholder="Password"
                className="textbox"
                {...formik.getFieldProps("password")}
              />
              <button type="submit" className="btn">
                Sign In
              </button>
            </div>
            <div className="text-center mt-5">
              <span>
                Forgot Password{" "}
                <Link to={"/recovery"} className="text-red-500 hover:underline">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
