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
    <div className="input  w-full">
      <input
        type={type}
        name={name}
        value={value}  // Use value prop directly
        onChange={onChange}  // Pass onChange handler from parent component
        onFocus={handleFocus}
        className="outline-none pl-3 w-full border-2   border-gray-200 py-3   text-[12.5px] rounded-md"
      
        onBlur={handleBlur}
      />

      <label
        htmlFor={name}
        className={`label ${isFocused || value ? "filled" : ""}`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
