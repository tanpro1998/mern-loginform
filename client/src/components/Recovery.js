import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/store";

import { useNavigate } from "react-router-dom";
import { generateOTP, verifyOTP } from "../helper/helper";

function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
    });
  }
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
          <form className="py-1" onSubmit={onSubmit}>
            <div className="flex justify-center py-4">
              <UserCircleIcon className=" h-[150px] w-[150px] text-blue-400 profile" />
            </div>
            <div className="flex flex-col gap-6 items-center">
              <span className="text-gray-500 text-center py-4 text-sm">
                Enter 6 digit OTP sent to your email.
              </span>
              <input
                type="text"
                placeholder="OTP Code"
                className="textbox"
                onChange={(e) => setOTP(e.target.value)}
              />
              <button type="submit" className="btn">
                Recover
              </button>
            </div>
            <div className="text-center mt-5">
              <span>
                Can't get OTP?{" "}
                <button
                  className="text-red-400 hover:underline"
                  onClick={resendOTP}
                >
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
