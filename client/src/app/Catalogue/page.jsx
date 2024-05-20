/* eslint-disable react/no-unescaped-entities */
"use client";
import Header from "@/components/Header";
import "../globals.scss";
import CardsFilter from "@/components/CardsFilter";

import { getAllProducts } from "../lib/Product";
import { useEffect, useState } from "react";
import { getCategory } from "../lib/Category";
import CardsProduit from "@/components/CardsProduit";
const Catalogue = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getAllProducts()
      .then((products) => {
        const promises = products.map((prod) => {
          return getCategory(prod.id_cat)
            .then((category) => {
              return { ...prod, category };
            })
            .catch((error) => {
              console.error("Error fetching category data:", error); 
              return prod;
            });
        });
        return Promise.all(promises);
      })
      .then((productsWithCategory) => { 
        setProduct(productsWithCategory);
      });
  }, []);
  return (
    <div className="mb-28">
      {/* section 1 */}
      <div>
        <Header Title={"Contactez-nous"} />
      </div>
      {/* section 2 */}

      <div className="  md:w-1/1 flex md:flex-row flex-col    mx-10  mt-12 m justify-center border border-red-600  md:space-x-12 ">
        <div className=" md:w-1/4    border  border-red-600   ">
          <CardsFilter className=" "/>
        </div>
        <div className=" md:w-1/1   border border-red-600 flex  ">
       
          <div className="flex  justify-center  flex-wrap border border-green-600 ">

            {product.map((product) => (
              <div key={product.id_prod} className=" mt-5">
                <CardsProduit
                  image={product.Image_thumbnail}
                  libelle={product.Libelle_prod}
                  categorie={product.category.Libelle_cat}
                  prix={product.prix_prod}
                  stock={product.Stock_prod}
                />
              </div>
            ))}
         
         
          </div>
        </div>
      </div>
    </div>
  );
};
export default Catalogue;
