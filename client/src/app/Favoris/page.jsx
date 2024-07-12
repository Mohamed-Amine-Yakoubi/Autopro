"use client";
import CardsProduit from "@/components/CardsProduit";
import React, { useEffect, useState } from "react";
import { getAllProducts, getSpecProduct } from "../lib/Product";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import { getCategory } from "../lib/Category";
import { deleteFavoris, getfavorisByUserID } from "../lib/Favoris";
import Header from "@/components/Header";

const Favoris = () => {
  const [products, setProducts] = useState([]);
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

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

  const handleFavoris = async (id_prod, id_user) => {
    try {
      await deleteFavoris(id_prod, id_user);

      location.reload();
    } catch (error) {
      alert("Failed to add to favorites");
    }
  };

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
      {session ? (
        <div className="   my-32">
          <div className=" ">
          {products && products.length > 0 ? (
            <div className="font-poppins text-center text-[20px] mb-8   font-extrabold	 text-greenColor">
              Vos article préférés
            </div>
             ) :null}
            <div className="flex md:flex-row flex-col   justify-center">
              {products && products.length > 0 ? (
                products.map((product) => (
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
                          handleFavoris(product.id_prod, session.user.id_user)
                        }
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-poppins text-[20px] text-gray-400">
                  Aucun article ajouté à la liste de souhaits
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex md:flex-row flex-col my-28 justify-center">
          <p className="font-poppins text-[20px] text-gray-400">
            Veuillez vous connecter pour voir vos favoris
          </p>
        </div>
      )}
    </div>
  );
};

export default Favoris;
