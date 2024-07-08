import React, { useState, useEffect } from "react";
import "./../style/InputIcon.scss";

const InputIcon = ({ type, name, placeholder, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="input-container-icon  w-full">
      <input
        type={type}
        name={name}
        value={value}  // Use value prop directly
        onChange={onChange}  // Pass onChange handler from parent component
        onFocus={handleFocus}
        className="outline-none pl-10 w-full border-2 pt-4 border-gray-200 py-1 bg-grayLight text-[12.5px] rounded-md"
      
        onBlur={handleBlur}
      />

      <label
        htmlFor={name}
        className={`pl-5 label ${isFocused || value ? "filled" : ""}`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputIcon;
