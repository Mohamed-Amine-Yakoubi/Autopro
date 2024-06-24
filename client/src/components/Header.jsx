/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
 
import golf_header from "../public/images/golf_header.jpg";
import porshe from "../public/images/porshe.jpg";
import bmw  from "../public/images/bmw.jpg";
 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Header = ({ Title ,subtitle}) => {
  const settings = {
    autoplay: true,
    speed: 1000,
    fade: true,
    dots: false, // Disable dots navigation
    arrows: false, // Disable arrows navigation
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
};
  return (
    <div className="">
      <div className="relative      ">
       
          <Slider {...settings}>
          <Image
              src={golf_header}
              alt="Cover 2"
              className=" object-cover  -pt-10 h-[200px]   w-full   "
            />

            <Image
              src={porshe}
              alt="Cover 1"
              className=" object-cover    h-[200px]   w-full   "
            />

           
            <Image
              src={bmw}
              alt="Cover 3"
              className=" object-cover -pt-24  h-[200px]   w-full   "
            />
          </Slider>
      

        <div className="absolute inset-0 bg-gray-900 opacity-50 rounded-md"></div>

        <div className="container absolute inset-0 flex    items-center    mx-auto   justify-center ">
          <div className="    flex flex-col   items-center justify-center md:flex-row      ">
            <div className="    text-white     ">
              <h1 className="text-[25px] font-bold text-center flex md:text-left md:mt-0 mt-5">
                {Title} /  {subtitle}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
