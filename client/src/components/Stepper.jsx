import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import "../styles/stepper.scss";

// Step components
const StepOne = () => (
  <div>
    <label htmlFor="name">Name:</label>
    <input name="name" type="text" />
  </div>
);

const StepTwo = () => (
  <div>
    <label htmlFor="email">Email:</label>
    <input name="email" type="email" />
  </div>
);

const StepThree = () => (
  <div>
    <label htmlFor="password">Password:</label>
    <input name="password" type="password" />
  </div>
);

// Array of step components
const steps = [StepOne, StepTwo, StepThree];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const CurrentStepComponent = steps[currentStep - 1];

  return (
    <div>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
              (i + 1 < currentStep || complete) ? "complete" : ""
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">Step {i + 1}</p>
          </div>
        ))}
      </div>
      
      <div className="step-content">
        <CurrentStepComponent />
      </div>
      
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            if (currentStep === steps.length) {
              setComplete(true);
            } else {
              setCurrentStep((prev) => prev + 1);
            }
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default Stepper;
