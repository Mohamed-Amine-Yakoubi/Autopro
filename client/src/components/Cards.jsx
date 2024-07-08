import React from "react";

const Cards = (props) => {
  const { className, children } = props;
  return (
    <div className="shadow-lg rounded-[20px]">
      {" "}
      <div
        className={`!z-5 relative border flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800   dark:shadow-none ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
export default Cards;
