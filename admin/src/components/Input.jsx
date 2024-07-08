import React, { useState, useEffect } from "react";
import "./../styles/Input.scss";

const Input = ({ type, name, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`  w-full   ${value  ? "pt-5" :isFocused?"pt-5": "pt-0"} `}>
      <div className="input ">
        <input
          type={type}
          name={name}
          value={value} // Use value prop directly
          onChange={onChange} // Pass onChange handler from parent component
          onFocus={handleFocus}
         className="outline-none pl-3 w-full border-2 pt-4 border-gray-200 py-1   text-[12.5px] rounded-md"
          onBlur={handleBlur}
        />

        <label
          htmlFor={name}
          className={`label ${isFocused || value ? "filled " : ""}  `}
        >
          {placeholder}
        </label>
      </div>
    </div>
  );
};

export default Input;
