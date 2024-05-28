import React from "react";

const InputFields = ({
  type,
  height,
  width,
  placeholder,
  paddingRight,
  name,
  onChange
}) => {
  const inputStyle = {
    height: height || "auto", // default to auto if height is not provided
    width: width || "100%", // default to auto if width is not provided
    // default to auto if width is not provided
  };
  if (type === "textarea") {
    return (
      <div className=" ">
        <textarea
          className="bg-grayColor rounded-lg outline-none px-5 pt-2   "
          style={inputStyle}
          type={type}
          name={name}
          placeholder={placeholder}
        />
      </div>
    );
  } else {
    return (
      <div className=" ">
        <input
          className={`bg-grayColor rounded-lg outline-none px-5    text-[14px]  `}
          style={inputStyle}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
};

export default InputFields;
