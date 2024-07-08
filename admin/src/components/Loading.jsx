import { Ellipsis } from "react-css-spinners";
export const Loading = () => {
  return (
    <div className="flex flex-col  justify-center items-center  h-[90vh]  ">
      {" "}
      <div>
        <Ellipsis color="#4BAF4F" size={80} thickness={7} />
 
      </div>
    </div>
  );
};
