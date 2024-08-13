"use client";
import { getVille } from "@/app/lib/Category";
import { getCommandeDetails, getMainCommande } from "@/app/lib/Commande";
import { getSpecProduct } from "@/app/lib/Product";
import { getAdrByIdUser } from "@/app/lib/User";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Autopro_logo from "../../../public/images/Autopro_logo.png";

const Cart = (props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [factureSaved, setFactureSaved] = useState(false);

  const [ville, setVille] = useState([]);
  const [commande, setCommande] = useState([]);
  const [Detailscommande, setDetailscommande] = useState([]);
  const [product, setProduct] = useState([]);
  const [adresse, setAdresse] = useState([]);
  const id_user = session?.user?.id_user || "";
  const id_Maincmd = props.params.Cart;

  console.log("commande", commande);

  const saveFacture = async (mainCommande, details, address, cities, products) => {
    const Autopro_logo_URL =
      "https://res.cloudinary.com/dszbzybhk/image/upload/v1723404962/c76ktevrn9lvxad0pmux.png";

      const TVA_RATE = 0.19;

      const FactureContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                font-family: "Arial", sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px 30px 30px 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                background-color: #fff;
              }
              .logo {
                width: 200px;
              }
              .section_1 {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .section_1 p {
                font-size: 13px;
              }
              .table_1 {
                width: 100%;
                margin-top: 30px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 50px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
              }
              .table_1 th {
                padding: 8px;
                font-size: 12px;
                border: 1px solid rgb(125, 125, 125);
              }
              .table_2 {
                width: 100%;
                margin-top: 10px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 10px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
                height: 400px;
              }
              .table_2 tr td {
                padding: 8px;
                font-size: 12px;
                border: 1px solid rgb(125, 125, 125);
              }
              .table_3 {
                width: 50%;
                margin-top: 30px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 50px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
                margin-right: 10px;
              }
              .table_4 {
                width: 100%;
                margin-top: 30px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 50px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
                text-align: center;
              }
              .section_3 th {
                padding: 8px;
                font-size: 12px;
              }
              .section_4 td {
                padding: 8px;
                font-size: 12px;
                text-align: center;
              }
              .table_5 {
                width: 50%;
                margin-top: 10px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 10px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
                margin-right: 10px;
                padding: 6px;
                text-align: start;
              }
              .table_6 {
                width: 100%;
                margin-top: 10px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 10px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
              }
              .table_7 {
                width: 33%;
                margin-top: 10px;
                border: 1px solid rgb(97, 97, 97);
                border-radius: 5px;
                border-collapse: separate;
                border-spacing: 0;
                overflow: hidden;
              }
              .table_7 th {
                padding: 8px;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="invoice-box">
              <div class="section_1">
                <div>
                  <img src="${Autopro_logo_URL}" class="logo" alt="logo" />
                </div>
                <div>
                  <h4 style="font-size: 30px; font-weight: bold">Facture</h4>
                  <p>N° #: ${mainCommande[0].id_MainCmd} du ${mainCommande[0].Date_cmd}</p>
                  <div style="border: 2px solid black; border-radius: 5px; padding: 10px; padding-inline-end: 120px;">
                    <p>${session.user.Telephone_user}</p>
                    <p style="font-weight: bold">${session.user.Nom_user} ${session.user.Prenom_user}</p>
                    <p>${address.rue_adr}</p>
                    <p>${address.code_adr} ${
                      cities.find(city => city.id_ville === address.id_ville)?.Libelle_ville
                    }</p>
                    <p>${session.user.Email_user}</p>
                  </div>
                </div>
              </div>
  
              <table class="table_1">
                <thead>
                  <tr>
                    <th style="width: 100px;">Référence</th>
                    <th style="width: 250px;">Désignation</th>
                    <th style="width: 50px;">Qté</th>
                    <th style="width: 100px;">Prix Unitaire</th>
                    <th style="width: 100px;">Montant HT</th>
                    <th style="width: 100px;">Montant TTC</th>
                  </tr>
                </thead>
              </table>
              <table class="table_2">
                <tbody>
                  ${details.map(detail => {
                    const product = products.find(prod => prod.id_prod === detail.id_prod);
                    return product ? `
                      <tr>
                        <td style="width: 100px;">${product.Reference_prod}</td>
                        <td style="width: 250px;">${product.Libelle_prod}</td>
                        <td style="width: 50px;">${detail.Qte_dtcmd}</td>
                        <td style="width: 100px;">${(product.prix_prod).toFixed(3)}</td>
                        <td style="width: 100px;">${(product.prix_prod * detail.Qte_dtcmd).toFixed(3)}</td>
                        <td style="width: 100px;">${(product.prix_prod * detail.Qte_dtcmd * (1 + TVA_RATE)).toFixed(3)}</td>
                      </tr>
                    ` : '';
                  }).join('')}
                </tbody>
              </table>
  <div style="display: flex" class="section_3">
        <table class="table_3">
          <tbody>
            <tr>
              <th>Base</th>
              <th>Taux</th>
              <th>Taxe</th>
            </tr>
          </tbody>
        </table>
        <table class="table_4">
          <tbody>
            <tr>
              <th>Total HT</th>
              <th>TVA</th>
              <th>Total TTC</th>
              <th style="font-weight:bold">NET A PAYER</th>
            </tr>
          </tbody>
        </table>
      </div>

        <div style="display: flex" class="section_4">
        <table class="table_5">
          <tbody>
            <tr>
             <td>${details.reduce((sum, detail) => sum + (products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd, 0).toFixed(3)}</td>
                      <td>${(TVA_RATE * 100).toFixed(2)}%</td>
                      <td>${details.reduce((sum, detail) => sum + ((products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd * TVA_RATE), 0).toFixed(3)}</td>
             
          
            </tr>
          </tbody>
        </table>
        <table class="table_6">
          <tbody>
        <tr>
                      <td>
                        ${details.reduce((sum, detail) => sum + (products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd, 0).toFixed(3)}
                      </td>
                      <td>
                        ${details.reduce((sum, detail) => sum + ((products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd * TVA_RATE), 0).toFixed(3)}
                      </td>
                      <td>
                        ${details.reduce((sum, detail) => sum + ((products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd * (1 + TVA_RATE)), 0).toFixed(3)}
                      </td>
                          <td style="font-weight:bold">
                        ${details.reduce((sum, detail) => sum + ((products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd * (1 + TVA_RATE)), 0).toFixed(3)}
                      </td>
                    </tr>
          </tbody>
        </table>
      </div>
  
                 <table class="table_7">
        <tbody>
          <tr>
            <th>Total</th>
            <th style="font-size: 12px; font-weight: bold">
                      ${details.reduce((sum, detail) => sum + ((products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd * (1 + TVA_RATE)), 0).toFixed(3)}
                    </th>
            <th>                        ${details.reduce((sum, detail) => sum + ((products.find(prod => prod.id_prod === detail.id_prod)?.prix_prod || 0) * detail.Qte_dtcmd * TVA_RATE), 0).toFixed(3)}
</th>
 
          </tr>
        </tbody>
      </table>
             
            </div>
          </body>
        </html>
      `;
      const FileName = `facture-${mainCommande[0].Reference_cmd}`;
    try {
      const response = await fetch(`http://localhost:4000/api/v1/facture/SaveFacture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom_user: session.user.Nom_user,
          Refrence_fact:FileName ,
          htmlContent: FactureContent,
          id_magasin:mainCommande[0].id_magasin,
          id_MainCmd:mainCommande[0].id_MainCmd,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save facture", response.statusText);
      } else {
        console.log("Facture saved successfully");
      }
    } catch (error) {
      console.error("Error saving facture:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session) {
          setLoading(false);
        }
          const address = await getAdrByIdUser(id_user);
          setAdresse(address);
       
        const cities = await getVille();
        setVille(cities);
        const mainCommande = await getMainCommande(id_Maincmd);
        setCommande(mainCommande);
        const details = await getCommandeDetails(id_Maincmd);
        setDetailscommande(details);

        const productPromises = details.map(item => getSpecProduct(item.id_prod));
        const products = await Promise.all(productPromises);
        setProduct(products);

        if (!factureSaved) {
          await saveFacture(mainCommande, details, address, cities, products);
          setFactureSaved(true);
        }
      } catch (error) {
        console.error("Error in fetching data or saving facture:", error);
      }
    };

    fetchData();
  }, [id_user, id_Maincmd, factureSaved, session]);

  const totalPrix = commande.reduce((sum, item) => sum + item.prix_total, 0);
  if (loading) return <Loading />;
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
          <tr className="text-center text-textColor font-semibold">
            <td className="pb-5 text-[14px]">{id_Maincmd}</td>
            <td className="pb-5 text-[14px]">08/08/2024</td>
            <td className="pb-5 text-[14px]">{session.user.Email_user}</td>

            <td className="pb-5 text-[14px]">{totalPrix} TND</td>

            <td className="pb-5 text-[14px]">Paiement a la livraison</td>
          </tr>
        </table>
      </div>
      <p className="text-textColor text-start text-[15px] my-8">
        Payez en argent comptant à la livraison ou par chèque libellé au nom de
        Autopro.
      </p>
      <p className=" text-start text-[22px] font-semibold text-darkColor ">
        Détails de la commande
      </p>
      <table className="  py-5 w-full">
        <tr className=" border-b pt-5">
          <td className="pt-5  text-[16px] font-semibold text-darkColor">
            Produit
          </td>
          <td className="pt-5  text-[16px] font-semibold text-darkColor">
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
