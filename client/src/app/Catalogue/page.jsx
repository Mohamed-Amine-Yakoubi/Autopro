"use client";
import Header from "@/components/Header";
 
import { getAllProducts } from "../lib/Product";
import { useEffect, useState } from "react";
import { getCategory } from "../lib/Category";
import CardsProduit from "@/components/CardsProduit";
import { FaSearch } from "react-icons/fa";
import { Loading } from "@/components/Loading";
import { Filter } from "./Filter";
import CardsFilterCatalogue from "@/components/CardsFilterCatalogue";
import { addFavoris } from "../lib/Favoris";
import { useSession } from "next-auth/react";

const Catalogue = () => {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const id_user = session?.user?.id_user || "";
  const [filter, setFilter] = useState({
    search: "",
    id_cat: null,
    id_subcat: null,
    id_marque: null,
    id_modele: null,
    id_motor: null,
    id_ville: null,
    id_mat: null,
    price: 5000,
  });

  const AddFavoris = async (id_prod) => {
    if (!id_user) {
      alert("You need to be logged in to add to favorites.");
      return;
    }

    try {
      await addFavoris(id_prod, id_user);
 
    } catch (error) {
      alert("Failed to add to favorites");
    }
  };
  const handleSearch = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

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
        setProducts(productsWithCategory);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      (filter.search === "" ||
        product.Libelle_prod?.toLowerCase().includes(
          filter.search.toLowerCase()
        )) &&
      (filter.id_cat === null || product.id_cat === parseInt(filter.id_cat)) &&
      (filter.id_subcat === null ||
        product.id_subcat === parseInt(filter.id_subcat)) &&
      (filter.id_ville === null ||
        product.id_ville === parseInt(filter.id_ville)) &&
      (filter.id_mat === null || product.id_mat === parseInt(filter.id_mat)) &&
      product.prix_prod <= filter.price &&
      (filter.id_marque === null ||
        product.id_marque === parseInt(filter.id_marque)) &&
      (filter.id_modele === null ||
        product.id_modele === parseInt(filter.id_modele)) &&
      (filter.id_motor === null ||
        product.id_motor === parseInt(filter.id_motor))
    );
  });

  // Pagination calculations

  const [currentPage, setCurrentPage] = useState(1);
  const [CataloguePerPage] = useState(12);
  const indexOfLastcommande = currentPage * CataloguePerPage;
  const indexOfFirstcommande = indexOfLastcommande - CataloguePerPage;
  const currentCatalogue = filteredProducts.slice(
    indexOfFirstcommande,
    indexOfLastcommande
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / CataloguePerPage); i++) {
    pageNumbers.push(i);
  }
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="mb-28">
      <Header Title={"Catalogue"} />
      <div className="flex md:flex-row flex-col mx-12 mt-12 md:space-x-12">
        <div className="md:w-1/3 w-full">
          <CardsFilterCatalogue
            filter={filter}
            onFilterChange={handleFilterChange}
          />

          <Filter filter={filter} onFilterChange={handleFilterChange} />
        </div>
        <div className="md:w-1/1 w-full">
          <div className="flex items-center bg-grayLight h-12 rounded-md">
            <FaSearch className="mx-5" />
            <input
              type="text"
              placeholder="Trouver votre article"
              className="outline-none bg-transparent"
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-wrap justify-center">
            {currentCatalogue.length > 0 ? (
              currentCatalogue.map((product) => (
                <div key={product.id_prod} className="mt-5">
                  <CardsProduit
                    image={product.Image_thumbnail}
                    libelle={product.Libelle_prod}
                    categorie={product.category.Libelle_cat}
                    prix={product.prix_prod}
                    stock={product.Stock_prod}
                    product={product}
                    link={`./Catalogue/${product.id_prod}`}
                    handleFavoris={() => AddFavoris(product.id_prod)}
                  />
                </div>
              ))
            ) : (
              <div className="flex md:flex-row flex-col my-28 justify-center">
                <p className="font-poppins text-[17px] text-gray-400">
                  produit est actuellement indisponible
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center py-4">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`px-3 py-1 rounded-full text-[13px] ${
                  number === currentPage
                    ? "bg-greenColor text-white"
                    : "bg-gray-200"
                } mx-1`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
