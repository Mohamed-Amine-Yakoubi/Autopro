 
import Image from "next/image";

import byd from "../public/images/partenaire/byd.png";
import infiniti from "../public/images/partenaire/infiniti.png";
import kia from "../public/images/partenaire/kia.png";
import mg from "../public/images/partenaire/mg.png";
import mitshi from "../public/images/partenaire/mitshi.png";
import nissan from "../public/images/partenaire/nissan.png";
import suzuki from "../public/images/partenaire/suzuki.png";
import toyota from "../public/images/partenaire/toyota.png";
import volkswagen from "../public/images/partenaire/volkswagen.png";
 

const Slider = () => {
  return (
    <div className="  inline-flex w-full flex-nowrap overflow-hidden     [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      <div className=" space-x-24 object-cover flex grayscale   animate-loop-scroll items-center justify-center md:justify-start  ">
   

        <Image className="w-20 " src={byd} alt="image" />
        <Image className="w-20 " src={infiniti} alt="image" />
        <Image className="w-20 " src={kia} alt="image" />
        <Image className="w-20 " src={mg} alt="image" />
        <Image className="w-20 " src={mitshi} alt="image" />
        <Image className="w-20 " src={nissan} alt="image" />
        <Image className="w-20 " src={suzuki} alt="image" />
        <Image className="w-20 " src={toyota} alt="image" />
        <Image className="w-20 " src={volkswagen} alt="image" />
      </div>
      
     
    </div>
  );
};
export default Slider;
