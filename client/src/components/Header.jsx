/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
 
import golf_header from "../public/images/golf_header.jpg";  
const Header = ({Title}) => {
  return (
    <div>
      {" "}
      <div className="relative      ">
       
         <Image
          src={golf_header}
          className=" object-cover   h-[280px]   w-full    "
          alt="header image"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-md"></div>

        <div className="container absolute inset-0 flex    items-center    mx-auto   justify-center ">
          <div className="    flex flex-col   items-center justify-center md:flex-row      ">
            <div className="    text-white     ">
              <h1 className="text-4xl font-bold text-center md:text-left md:mt-0 mt-5">
                {Title}
              </h1>
     
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
