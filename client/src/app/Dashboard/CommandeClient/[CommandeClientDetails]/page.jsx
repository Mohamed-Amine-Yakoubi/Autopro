"use client";
import { getVille } from "@/app/lib/Category";
import {
  Get_AllCommandebydiMagasin,
  getAllMainCommande,
  getCommandeDetails,
  getMainCommande,
} from "@/app/lib/Commande";
import { getStoreByID } from "@/app/lib/Magasin";
import { getSpecProduct } from "@/app/lib/Product";
import { getAdrByIdUser, getUser } from "@/app/lib/User";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

const CommandeClientDetails = (props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [ville, setVille] = useState([]);
  const [commande, setCommande] = useState([]);
  const [Detailscommande, setDetailscommande] = useState([]);

  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [adresse, setAdresse] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deselected, setDeselected] = useState(null);

  const id_user = session?.user?.id_user || "";
  const id_Maincmd = props.params.CommandeClientDetails;
  const store = useSelector((state) => state.store);
 

  useEffect(() => {
    if (session) {
      setLoading(false); // Assuming this is correctly used to indicate session loaded
    }
    getMainCommande(id_Maincmd).then((itemCommande) => {
      setCommande(itemCommande);
      const AdresseUser = itemCommande.map((itemAdresse) =>
        getAdrByIdUser(itemAdresse.id_user)
      );
      const User = itemCommande.map((itemUser) => getUser(itemUser.id_user));
      Promise.all(User).then((item) => setUser(item));
      Promise.all(AdresseUser).then((item) => setAdresse(item));
    });

    getVille()
      .then((Ville) => {
        setVille(Ville);
      })
      .catch((error) => {
        console.error("Error fetching Ville:", error);
        // Handle error state if needed
      });

    if (store) {
      store.items.map((itemStore) => {
        Get_AllCommandebydiMagasin(id_Maincmd, itemStore.id_magasin).then(
          (itemsCommandeDetails) => {
            setDetailscommande(itemsCommandeDetails);
            const productDetails = itemsCommandeDetails.map((itemProduct) =>
              getSpecProduct(itemProduct.id_prod)
            );

            Promise.all(productDetails).then((item) => setProduct(item));
          }
        );
      });
    }
  }, [id_user, id_Maincmd]);

  const totalPrix = Detailscommande.reduce(
    (sum, item) => sum + item.prix_Total_dtcmd,
    0
  );
  const Date_cmd = Detailscommande.map((item) => item.Date_cmd);
  const firstDate = Date_cmd[0];
  if (loading) return <Loading />;
  const renderedUser = new Set();

  console.log("ville", ville);
  console.log("commande", commande);

  console.log("Detailscommande", Detailscommande);
  console.log("product", product);
  console.log("user", user);
  console.log("adresse", adresse);

  return (
    <div className="  ">
      <p className="text-start text-[15px] mb-8">
        La commande <span className="text-greenColor">n°{id_Maincmd}</span> a
        été passée le {firstDate}.
      </p>

      <div className="shadow-lg rounded-lg overflow-hidden ">
      <table className="w-full overflow-x-scroll">
        <caption className="bg-grayLight text-start    rounded-t-md text-[20px] px-5 py-3 font-bold text-greenColor  border">
          {" "}
          Détails de la commande
        </caption>
        <thead>
          <tr className="    pt-5">
            <td className="py-4      px-5 text-[14px]    border-b text-center  font-semibold text-darkColor">
              n°
            </td>
            <td className="py-4    w-1/4 text-[14px] border-b font-semibold text-darkColor">
              Produit
            </td>
            <td className="py-4    w-1/4  text-[14px] border-b font-semibold text-darkColor">
              Référence
            </td>
            <td className="py-4    text-center w-1/5 text-[14px] border-b font-semibold text-darkColor">
              Quantité
            </td>
            <td className="py-4    w-1/5  text-center text-[14px] border-b font-semibold text-darkColor">
              Total
            </td>
            <td className="py-4   w-1/3  text-[14px] border-b font-semibold text-darkColor"></td>
          </tr>
        </thead>
        <tbody className="mb-5 " colSpan="4">
          {Detailscommande.map((items, index) => {
            const productItem = product.find(
              (itemsProduct) => itemsProduct.id_prod === items.id_prod
            );
            return productItem ? (
              <tr key={index} className=" ">
                <td className="text-center py-1.5  w-10  text-[13px]">
                  {items.id_dtcmd}
                </td>
                <td className=" py-2 text-[13.5px] flex items-center ">
                  <div className=" bg-grayLight rounded-md  ">
                  <Image
                    className=" object-contain p-2 mix-blend-multiply "
                    src={productItem.Image_thumbnail}
                    width={50}
                    height={50}
                    alt="Image_thumbnail"
                  />
                  </div>
                  <Link
                    href={`/Catalogue/${productItem.id_prod}`}
                    className="text-greenColor mx-2 "
                  >
                    {productItem.Libelle_prod}
                  </Link>{" "}
                </td>
                <td className="py-2 text-[13px]">
                  {productItem.Reference_prod}
                </td>
                <td className="py-1.5 text-center text-[13px]">
                  {items.Qte_dtcmd}
                </td>
                <td className="py-1.5 text-center   text-[13px]">
                  {items.prix_Total_dtcmd} TND
                </td>

                <td className="py-1 5 text-center text-[13px]">
                  <Link href={`/Catalogue/${items.id_prod}`}>
                    Voir...
                  </Link>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
        <tfoot className=" ">
          <tr className="text-[13.5px] font-semibold text-darkColor  border-t">
            <td className="pt-5 px-5" colSpan="2">
              Sous-total :
            </td>
            <td className="pt-5" colSpan="2">
              {totalPrix} TND
            </td>
          </tr>
          <tr className="text-[13.5px] font-semibold text-darkColor">
            <td className="pt-2 px-5" colSpan="2">
              Moyen de paiement :
            </td>
            <td className="pt-2" colSpan="2">
              Paiement à la livraison
            </td>
          </tr>
          <tr className="text-[16px]   font-bold text-darkColor border-b">
            <td className="pt-2 px-5 pb-5" colSpan="2">
              Total :
            </td>
            <td className="pt-2 pb-5" colSpan="2">
              {totalPrix + 7} TND
            </td>
          </tr>
        </tfoot>
      </table>
</div>
      <p className="text-start text-[20px] font-semibold text-darkColor mt-10 my-5">
        Adresse de facturation
      </p>

      {user.map((itemUser) => {
        if (!renderedUser.has(itemUser.id_user)) {
          renderedUser.add(itemUser.id_user);
          const adresseUser = adresse.find(
            (item) => item.id_user === itemUser.id_user
          );

          return adresseUser ? (
            <div
              key={itemUser.id_user}
              className="space-y-2 text-start text-[13.5px] text-darkColor "
            >
              <p>
                <span className="font-semibold text-greenColor">
                  Nom et Prénom :{" "}
                </span>
                {itemUser.Prenom_user} {itemUser.Nom_user}{" "}
              </p>

              <p>
                <span className="font-semibold text-greenColor">
                  Numéro et nom de rue :{" "}
                </span>
                {adresseUser.rue_adr}
              </p>
              {ville
                .filter((item) => item.id_ville === adresseUser.id_ville)
                .map((filtereditem) => (
                  <p key={filtereditem.id_ville}>
                    <span className="font-semibold text-greenColor">
                      Region :{" "}
                    </span>
                    {filtereditem.Libelle_ville}
                  </p>
                ))}
              <p>
                <span className="font-semibold text-greenColor">
                  Code postal :{" "}
                </span>
                {adresseUser.code_adr}
              </p>

              <p>
                <span className="font-semibold text-greenColor">
                  Numéro de télephone :{" "}
                </span>
                {itemUser.Telephone_user}
              </p>

              <p className="mt-3 text-[13.5px]">
                <span className="font-semibold text-greenColor">E-mail : </span>
                {itemUser.Email_user}
              </p>
            </div>
          ) : null;
        }
      })}
    </div>
  );
};

export default CommandeClientDetails;
