"use client";
import CardsProduit from "@/components/CardsProduit";
import React, { useEffect, useState } from "react";
import { getAllProducts, getSpecProduct } from "../lib/Product";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import { getCategory } from "../lib/Category";
import { deleteFavoris, getfavorisByUserID } from "../lib/Favoris";
import Header from "@/components/Header";
import { FaSearch } from "react-icons/fa";

const Favoris = () => {
  const [products, setProducts] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchFavoris = async () => {
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const id_user = session.user.id; // Ensure you extract the correct user ID
        const favoris = await getfavorisByUserID(id_user);

        if (!favoris || !Array.isArray(favoris)) {
          setFavoris([]);
          setLoading(false);
          return;
        }

        setFavoris(favoris);

        const productsPromises = favoris.map((item) =>
          getSpecProduct(item.id_prod)
        );

        const products = await Promise.all(productsPromises);

        const productsWithCategoryPromises = products.map(async (prod) => {
          try {
            const category = await getCategory(prod.id_cat);
            return { ...prod, category };
          } catch (error) {
            console.error("Error fetching category data:", error);
            return prod; // Return the product without category if there's an error
          }
        });

        const productsWithCategory = await Promise.all(
          productsWithCategoryPromises
        );

        setProducts(productsWithCategory);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoris();
  }, [session]);

  const handleFavoris = async (id_prod, id_user ,id_fav) => {
    try {

      await deleteFavoris(id_prod, id_user);
      setFavoris((prevFav) => prevFav.filter((e) => e.id_fav !== id_fav));
      setProducts((prevProducts) => prevProducts.filter((p) => p.id_prod !== id_prod));
 
    } catch (error) {
      alert("Failed to add to favorites");
    }
  };

  const handleSearch = (e) => {
    setFilter(e.target.value);
  };
  const filteredData = products.filter(
    (item) =>
      item.Libelle_prod?.toLowerCase().includes(filter.toLowerCase()) ?? false
  );
 
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header Title={"Favoris"} />
      </div>

      <div className="    flex md:flex-row flex-col    mx-12  mt-12  md:space-x-12  mb-8  ">
        <div className=" md:w-1/1    w-full  ">
          <div className="flex md:flex-row flex-col justify-between  items-center ">
            <div>
              <h1 className="text-[22px] text-gray-700 font-semibold">
                {" "}
                Vos produits préférés
              </h1>
              <h1 className="text-[14px] text-greenColor">
                {filteredData.length} produits  
              </h1>
            </div>
            <div className="flex flex-row items-center space-x-5 ">
              <div className="flex flex-row  items-center  border border-gray-300 bg-grayLight h-10 rounded-md   ">
                <FaSearch className="mx-5 text-gray-500 text-[13px]" />
                <input
                  type="text"
                  placeholder="Trouver un produit"
                  className="outline-none bg-transparent text-[13px]"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          {session ? (
            <div className="   my-10">
              <div className="flex md:flex-row flex-col   justify-center">
                {filteredData && filteredData.length > 0 ? (
                  filteredData.map((product) => {
                    const favorite=favoris.find(e=>e.id_prod===product.id_prod)
                    return(
                    <div key={product.id_prod}>
                      <div className="flex justify-center">
                        <CardsProduit
                          image={product.Image_thumbnail}
                          libelle={product.Libelle_prod}
                          categorie={product.category.Libelle_cat}
                          prix={product.prix_prod}
                          stock={product.Stock_prod}
                          link={`./Catalogue/${product.id_prod}`}
                          handleFavoris={() =>
                            handleFavoris(product.id_prod, session.user.id_user ,favorite.id_fav)
                          }
                        />
                      </div>
                    </div>
                 ) })
                ) : (
                  <p className="font-poppins text-[20px] my-32 text-gray-400">
                    Aucun article ajouté à la liste de souhaits
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col my-32 justify-center">
              <p className="font-poppins text-[20px] text-gray-400">
                Veuillez vous connecter pour voir vos favoris
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favoris;
