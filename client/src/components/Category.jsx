import Image from "next/image";
import p1 from "../public/images/cataloguePhoto/p1.png";
import p2 from "../public/images/cataloguePhoto/p2.png";
import p3 from "../public/images/cataloguePhoto/p3.png";
import p4 from "../public/images/cataloguePhoto/p4.png";
import p5 from "../public/images/cataloguePhoto/p5.png";
import p6 from "../public/images/cataloguePhoto/p6.png";
import p7 from "../public/images/cataloguePhoto/p7.png";
import p8 from "../public/images/cataloguePhoto/p8.png";
import p9 from "../public/images/cataloguePhoto/p9.png";
import p10 from "../public/images/cataloguePhoto/p10.png";
import p11 from "../public/images/cataloguePhoto/p11.png";
import p12 from "../public/images/cataloguePhoto/p12.png";
import p13 from "../public/images/cataloguePhoto/p13.png";
import p14 from "../public/images/cataloguePhoto/p14.png";
import p15 from "../public/images/cataloguePhoto/p15.png";
const Category = () => {
  return (
    <div className="  flex justify-center items-center h-full mt-5 mb-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7  gap-2 justify-center    ">
   
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg   justify-center text-center hover:scale-105 shadow-md">
          <div className="flex justify-center">
            <Image src={p1} alt="p1" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p2} alt="p2" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p3} alt="p3" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p4} alt="p4" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p5} alt="p5" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p6} alt="p6" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p7} alt="p7" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p8} alt="p8" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p9} alt="p9" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p10} alt="p10" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p11} alt="p11" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p12} alt="p12" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p13} alt="p13" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p14} alt="p14" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
        <div className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg  justify-center text-center">
          <div className="flex justify-center">
            <Image src={p15} alt="p15" className="w-40 border " />
          </div>
          <h2>Moteur</h2>
        </div>
      
     
      </div>
    </div>
  );
};
export default Category;
