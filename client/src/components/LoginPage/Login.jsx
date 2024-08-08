"use client";
import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import ForgotPassword from "./ForgotPassword";
import "../../styles/Login.scss";

const Login = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <div className="   ">
      <div className="py-5  overflow-hidden rounded-lg">
        <div
          className={`lg:w-1/2  right-10   transition-all duration-700 ease-in-out ${
            isAnimated || showForgotPassword ? "translate-x-full opacity-0 -z-10" : "opacity-100"
          }`}
        >
          <SigninForm isAnimated={isAnimated} setIsAnimated={setIsAnimated}  setShowForgotPassword={setShowForgotPassword}/>
        </div>

        <div
          className={`absolute    top-0 left-0 right-0 bottom-0   h-full lg:w-1/2 transition-all duration-700 ease-in-out  ${
            isAnimated || showForgotPassword
              ? "lg:translate-x-full translate-x-0 opacity-100 animate-show "
              : "-translate-x-full opacity-0"
          }`}
        >
          <SignupForm isAnimated={isAnimated} setIsAnimated={setIsAnimated}  />
        </div>

        <div
          className={`absolute    top-0 left-0 right-0 bottom-0   h-full lg:w-1/2 transition-all duration-700 ease-in-out  ${
            showForgotPassword ||isAnimated  
              ? "translate-x-0 opacity-100 animate-show"
              : "translate-x-full opacity-0 -z-10"
          }`}
        >
           <ForgotPassword isAnimated={showForgotPassword} setIsAnimated={setIsAnimated} setShowForgotPassword={setShowForgotPassword} />
        </div>

        <div
          id="overlay-container"
          className={`     hidden lg:block absolute top-0 left-1/2 w-1/2 h-full overflow-hidden  transition-transform duration-700 ease-in-out z-100 ${
            isAnimated ? "-translate-x-full" : ""
          }`}
        >
          <div
            id="overlay"
            className={`   relative -left-full h-full w-[200%] transform  transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              id="overlay-left"
              className={`    w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%]   transition-transform duration-700 ease-in-out ${
                isAnimated ? "translate-x-0" : "-translate-x-[20%]"
              }`}
            ></div>

            <div
              id="overlay-right"
              className={`  w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform   transition-transform duration-700 ease-in-out ${
                isAnimated ? "translate-x-[20%]" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
