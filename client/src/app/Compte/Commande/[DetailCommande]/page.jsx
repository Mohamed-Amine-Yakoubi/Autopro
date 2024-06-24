"use client";
import { getVille } from "@/app/lib/Category";
import {
  Get_AllCommandebydiMagasin,
  getCommandeDetails,
  getMainCommande,
} from "@/app/lib/Commande";
import { getSpecProduct } from "@/app/lib/Product";
import { getAdrByIdUser } from "@/app/lib/User";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const DetailCommande = (props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [ville, setVille] = useState([]);
  const [commande, setCommande] = useState([]);
  const [Detailscommande, setDetailscommande] = useState([]);
  const [product, setProduct] = useState([]);
  const [adresse, setAdresse] = useState([]);

  const id_user = session?.user?.id_user || "";
  const id_Maincmd = props.params.DetailCommande;

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
      .then((mainCommande) => {
        setCommande(mainCommande);

        // Create an array of promises for fetching Commande by Magasin
        const CommandebydiMagasinPromises = mainCommande.map((item) =>
          Get_AllCommandebydiMagasin(id_Maincmd, item.id_magasin)
        );

        // Use Promise.all to wait for all promises to resolve
        Promise.all(CommandebydiMagasinPromises)
          .then((allMagasins) => {
            setDetailscommande(allMagasins);

            // Create an array of promises for fetching product details
            const productPromises = allMagasins.flatMap((magasin) =>
              magasin.map((product) => getSpecProduct(product.id_prod))
            );

            // Use Promise.all to wait for all product promises to resolve
            Promise.all(productPromises)
              .then((products) => {
                setProduct(products);
              })
              .catch((error) => {
                console.error("Error fetching product details:", error);
                // Handle error state if needed
              });
          })
          .catch((error) => {
            console.error("Error fetching Commande by Magasin:", error);
            // Handle error state if needed
          });
      })
      .catch((error) => {
        console.error("Error fetching main commande:", error);
        // Handle error state if needed
      });
  }, [id_user, id_Maincmd]);

  const totalPrix = commande.reduce((sum, item) => sum + item.prix_total, 0);
  if (loading) return <Loading />;

  console.log("ville", ville);
  console.log("commande", commande);
  console.log("Detailscommande", Detailscommande);
  console.log("product", product);
  console.log("adresse", adresse);

  return (
    <div className="  ">
      <p className="text-start text-[15px] my-8">
        Payez en argent comptant à la livraison ou par chèque libellé au nom de
        Autopro.
      </p>

      <table className="border  p-10 w-full">
        <p className="text-start text-[22px] font-semibold text-darkColor ">
          Détails de la commande
        </p>
        <thead>
          <tr className=" border-b  pt-5">
            <td className="pt-5  px-5 text-[15px] font-semibold text-darkColor">
              Produit
            </td>
            <td className="pt-5   text-[15px] font-semibold text-darkColor">
              Total
            </td>
          </tr>
        </thead>
        <tbody>
          {Detailscommande.flat().map((items, index) => {
            const productItem = product.find(
              (item) => item.id_prod === items.id_prod
            );
            return productItem ? (
              <tr key={`${productItem.id_prod}-${index}`} className=" ">
                <td className="py-2 pt-3 text-[13.5px]">
                  {productItem.Libelle_prod} x {items.Qte_dtcmd}
                </td>
                <td className="py-2 pt-3 text-[13.5px]">
                  {productItem.prix_prod * items.Qte_dtcmd} TND
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
        </tbody>
      </table>

      <p className="text-start text-[20px] font-semibold text-darkColor my-5">
        Adresse de facturation
      </p>
      <div className="space-y-2 text-start text-[13.5px] text-darkColor ">
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
            <p key={filtereditem.id_ville}>
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

export default DetailCommande;
