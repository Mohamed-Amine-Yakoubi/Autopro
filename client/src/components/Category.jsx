import { getAllCategories } from "@/app/lib/Category";
import Image from "next/image";
import { useEffect, useState } from "react";

const Category = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getAllCategories().then((category) => {
      setCategory(category);
    });
  }, []);

  return (
    <div className="  flex justify-center items-center h-full mt-5 mb-4">

        <div
        
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7  gap-3 justify-center    "
        >
                {category.map((item) => (
          <div   key={item.id_cat} className="flex  flex-col bg-gray-200 w-52 h-52 rounded-lg   justify-center text-center  hover:scale-105 shadow-md">
            <div className="flex justify-center ">
              <Image
                src={item.Image_cat}
                alt="p1"
                width={150}
                loading="eager"
                height={150}
                className="w-40 border "
              />
            </div>
            <h2 className="text-[13.5px]">{item.Libelle_cat} </h2>
          </div>
             ))}
        </div>
   
    </div>
  );
};
export default Category;
