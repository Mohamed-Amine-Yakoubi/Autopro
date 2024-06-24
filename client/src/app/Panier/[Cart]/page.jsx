"use client";
import { getVille } from "@/app/lib/Category";
import { getCommandeDetails, getMainCommande } from "@/app/lib/Commande";
import { getSpecProduct } from "@/app/lib/Product";
import { getAdrByIdUser } from "@/app/lib/User";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
 

const Cart = (props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
 
  const [ville, setVille] = useState([]);
  const [commande, setCommande] = useState([]);
  const [Detailscommande, setDetailscommande] = useState([]);
  const [product, setProduct] = useState([]);
  const [adresse, setAdresse] = useState([]);
 
  const id_user = session?.user?.id_user || "";
  const id_Maincmd = props.params.Cart;
  const id_MainCmd = parseInt(
    Buffer.from(id_Maincmd, "base64").toString("utf-8"),
    10
  );

  useEffect(() => {
    if (session) {
      setLoading(false); // Assuming this is correctly used to indicate session loaded
    }
    if (id_user) {
      getAdrByIdUser(id_user)
        .then((item) => {
          setAdresse(item);
        })
        .catch((error) => {
          console.error("Error fetching user address:", error);
          // Handle error state if needed
        });
    }
    getVille()
      .then((Ville) => {
        setVille(Ville);
      })
      .catch((error) => {
        console.error("Error fetching Ville:", error);
        // Handle error state if needed
      });

    getMainCommande(id_Maincmd)
      .then((item) => {
        setCommande(item);
      })
      .catch((error) => {
        console.error("Error fetching main commande:", error);
        // Handle error state if needed
      });

    getCommandeDetails(id_Maincmd)
      .then((items) => {
        setDetailscommande(items);
        const productPromises = items.map((item) =>
          getSpecProduct(item.id_prod)
        );
        Promise.all(productPromises).then((product) => {
          setProduct(product);
        });
      })
      .catch((error) => {
        console.error("Error fetching main detailscommande:", error);
        // Handle error state if needed
      });
  }, [id_user, id_Maincmd]);

  const totalPrix = commande.reduce((sum, item) => sum + item.prix_total, 0);
  if (loading) return <Loading />;

 
  return (
    <div className=" my-36  mx-48 ">
      <div className="flex items-center justify-center space-x-2 my-8">
        <FaCircleCheck className="text-center text-greenColor" />
        <p className="text-center text-greenColor font-semibold text-[18px]">
          Merci {session.user.Nom_user} {session.user.Prenom_user}, Votre
          commande a été recue
        </p>
      </div>
      <div className="flex flex-col items-center">
        <table className=" border py-5">
          <tr className="text-center pt-5">
            <td className="pt-5 w-1/5 text-[13px] text-gray-500">
              Numero de commande
            </td>
            <td className="pt-5 w-1/5 text-[13px] text-gray-500">Date</td>
            <td className="pt-5 w-1/5 text-[13px] text-gray-500">E-mail</td>
            <td className="pt-5 w-1/5 text-[13px] text-gray-500">Total</td>
            <td className="pt-5 w-1/5 text-[13px] text-gray-500">
              Moyen de paiement
            </td>
          </tr>
          <tr className="text-center  font-semibold">
            <td className="pb-5 text-[14px]">{id_Maincmd}</td>
            <td className="pb-5 text-[14px]">{commande.Date_cmd}</td>
            <td className="pb-5 text-[14px]">{session.user.Email_user}</td>

            <td className="pb-5 text-[14px]">{totalPrix} TND</td>

            <td className="pb-5 text-[14px]">Paiement a la livraison</td>
          </tr>
        </table>
      </div>
      <p className="text-start text-[15px] my-8">
        Payez en argent comptant à la livraison ou par chèque libellé au nom de
        Autopro.
      </p>
      <p className="text-start text-[22px] font-semibold text-darkColor ">
        Détails de la commande
      </p>
      <table className="  py-5 w-full">
        <tr className=" border-b pt-5">
          <td className="pt-5   text-[17px] font-semibold text-darkColor">
            Produit
          </td>
          <td className="pt-5   text-[17px] font-semibold text-darkColor">
            Total
          </td>
        </tr>
        {Detailscommande.map((items) => {
          const productItems = product.find(
            (item) => item.id_prod === items.id_prod
          );
          return productItems ? (
            <tr key={productItems.id_prod} className="  ">
              <td className="py-2 pt-3 text-[13.5px]">
                {productItems.Libelle_prod} x {items.Qte_dtcmd}
              </td>
              <td className="py-2 pt-3 text-[13.5px]">
                {productItems.prix_prod * items.Qte_dtcmd} TND
              </td>
            </tr>
          ) : null;
        })}

        <tr className="text-[13.5px] font-semibold text-darkColor border-t  ">
          <td className="pt-5">Sous-total :</td>
          <td className="pt-5">{totalPrix} </td>
        </tr>
        <tr className="text-[13.5px] font-semibold text-darkColor  ">
          <td className="pt-2">Moyen de paiement :</td>
          <td className="pt-2">Paiement a la livraison </td>
        </tr>
        <tr className="text-[16px] font-bold text-darkColor border-b   mb-5">
          <td className="pt-2 pb-5">Total : </td>

          <td className="pt-2 pb-5">{totalPrix} TND</td>
        </tr>
      </table>

      <p className="text-start text-[20px] font-semibold text-darkColor my-5">
        Adresse de facturation
      </p>
      <div className="space-y-2 text-start text-[13px] text-darkColor ">
        <p>
          <span className="font-semibold">Nom et Prénom : </span>
          {session.user.Prenom_user} {session.user.Nom_user}{" "}
        </p>

        <p>
          <span className="font-semibold">Numéro et nom de rue : </span>
          {adresse.rue_adr}
        </p>
        {ville
          .filter((item) => item.id_ville === adresse.id_ville)
          .map((filtereditem) => (
            <p key={filtereditem.id_adr}>
              <span className="font-semibold">Region : </span>
              {filtereditem.Libelle_ville}
            </p>
          ))}
        <p>
          <span className="font-semibold">Code postal : </span>
          {adresse.code_adr}
        </p>

        <p>
          <span className="font-semibold">Numéro de télephone : </span>
          {session.user.Telephone_user}{" "}
        </p>
      </div>
      <p className="mt-3">
        <span className="font-semibold">E-mail : </span>
         {session.user.Email_user}{" "}
      </p>
    </div>
  );
};
export default Cart;
