/* eslint-disable react/no-unescaped-entities */
"use client";
import Header from "@/components/Header";
import "../globals.scss";
import { getAllProducts } from "../lib/Product";
import { useEffect, useState } from "react";
import { getCategory } from "../lib/Category";
import CardsProduit from "@/components/CardsProduit";
import { FaSearch } from "react-icons/fa";
import { Loading } from "@/components/Loading";

import { Filter } from "./Filter";
import Link from "next/link";

const Catalogue = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // product
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
        setLoading(false);
      });
  }, []);
 
  if (loading) return <div><Loading/></div>;
  return (
    <div className="mb-28">
      {/* section 1 */}
      <div>
        <Header Title={"Contactez-nous"} />
      </div>
      {/* section 2 */}

      <div className="  md:w-1/1 flex md:flex-row flex-col    mx-12  mt-12  md:space-x-12   ">
        <div className=" md:w-1/4    ">
          <Filter />
        </div>

        <div className=" md:w-1/1     ">
          <div className="flex   items-center   bg-grayLight h-14 rounded-md   ">
            <FaSearch className="mx-5" />
          </div>
          <div className="flex   flex-wrap  justify-center ">
            {product.map((product) => (
              <div key={product.id_prod} className="mt-5     ">
                <Link
               
                  href={`/Catalogue/${product.id_prod}`}
                >
                  <CardsProduit
                    image={product.Image_thumbnail}
                    libelle={product.Libelle_prod}
                    categorie={product.category.Libelle_cat}
                    prix={product.prix_prod}
                    stock={product.Stock_prod}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Catalogue;
