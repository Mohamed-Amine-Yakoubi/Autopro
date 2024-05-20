"use client";
import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
 

import "../../styles/Login.scss";
const Login = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className=" flex justify-center items-center ">
      <div className="h-3/4 py-8 w-3/4 bg-white relative overflow-hidden rounded-lg ">
        <div
       
          className={`  h-full w-1/2   transition-all duration-700 ease-in-out z-20  ${
            isAnimated
              ? "translate-x-full opacity-100   animate-show"
              : "opacity-0 z-10"
          }`}
        >
          <SignupForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
        </div>

        <div
          className={`absolute top-0 left-0 h-full w-1/2     transition-all duration-700 ease-in-out ${
            isAnimated ? "translate-x-full opacity-0 -z-10" : ""
          }`}
        >
          <SigninForm isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
        </div>

        <div
          id="overlay-container"
          className={` absolute top-0 left-1/2 w-1/2 h-full overflow-hidden  transition-transform duration-700 ease-in-out z-100 ${
            isAnimated ? "-translate-x-full" : ""
          }`}
        >
          <div
            id="overlay"
            className={`  relative -left-full h-full w-[200%] transform  transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              id="overlay-left"
              className={`   w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%]   transition-transform duration-700 ease-in-out ${
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
