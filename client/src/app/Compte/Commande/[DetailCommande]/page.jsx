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
import { getAdrByIdUser } from "@/app/lib/User";
import { Loading } from "@/components/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FcCancel } from "react-icons/fc";
import { IoEyeSharp } from "react-icons/io5";

const DetailCommande = (props) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const [ville, setVille] = useState([]);
  const [commande, setCommande] = useState([]);
  const [Detailscommande, setDetailscommande] = useState([]);
  const [magasin, setMagasin] = useState([]);
  const [product, setProduct] = useState([]);
  const [adresse, setAdresse] = useState([]);
  const [selected, setSelected] = useState(null);
  const [deselected, setDeselected] = useState(null);

  const id_user = session?.user?.id_user || "";
  const id_Maincmd = props.params.DetailCommande;

  const handleCommande = (id_prod) => {
    if (id_prod) {
      setSelected(id_prod);
    } else if (id_prod === null) {
      setSelected(id_prod);
    }
  };

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
        const Magasin = mainCommande.map((item) =>
          getStoreByID(item.id_magasin)
        );
        Promise.all(Magasin).then((magasinItem) => {
          setMagasin(magasinItem);
        });
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
  const Date_cmd = commande.map((item) => item.Date_cmd);
  const firstDate = Date_cmd[0];

  const handleEtat = async (e,id_cmd) => {
    e.preventDefault();
    const newEtat = e.target.name; // Get the new state from the button name

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/commande/Update_commande/${id_cmd}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ etat_cmd: newEtat }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update store");
      }

      const result = await res.json();

      if (result) {
        const updatedCommandes = commande.map((cmd) =>
          cmd.id_cmd === id_cmd ? { ...cmd, etat_cmd: newEtat } : cmd
        );
        setCommande(updatedCommandes);
      }
    } catch (error) {
      console.error("Failed to update store:", error.message);
      alert("Failed to update store");
    }
  };
  if (loading) return <Loading />;

  return (
    <div className="  ">


      <p className="text-start text-[15px] mb-8">
        La commande <span className="text-greenColor">n°{id_Maincmd}</span> a
        été passée le {firstDate}.
      </p>

      <table className="border  rounded-md p-10 w-full">
        <caption className="bg-grayLight text-start    rounded-t-md text-[17px] px-5 py-3 font-bold text-greenColor  border">
          {" "}
          Détails de la commande
        </caption>
        <thead>
          <tr className="    pt-5">
            <td className="py-4 pl-5 text-[14px]  w-[80px] font-semibold text-darkColor">
              n°
            </td>
            <td className="py-4   text-[14px] font-semibold text-darkColor">
              Référence
            </td>
            <td className="py-4  text-[14px] font-semibold text-darkColor">
              Total
            </td>
            <td className="py-4  text-[14px] font-semibold text-darkColor">
              Etat
            </td>
            <td className="py-4 text-[14px] font-semibold text-darkColor"></td>
          </tr>
        </thead>
        <tbody className="mb-5 " colSpan="4">
          {commande.map((items, index) => (
            <tr key={index} className=" ">
              <td className="pl-5 py-1.5      text-[13px]">{items.id_cmd}</td>
              <td className="py-1.5   text-[13px]">
                {items.Reference_cmd} TND
              </td>
              <td className="py-1.5   text-[13px]">{items.prix_total} TND</td>

              <td className=" py-1.5  text-[13px]">
                {items.etat_cmd === "en attente" ? (
                  <p className="text-yellow-600">en attente...</p>
                ) : items.etat_cmd === "approuvé" ? (
                  <p className="text-greenColor">Terminée</p>
                ) : items.etat_cmd === "Annuler" ? (
                  <p className="text-red-400">Annuler</p>
                ) : null}
              </td>
              <td className="py-1 5  text-[13px]">
                <Dropdown className="bg-gray-100 p-3 rounded-md shadow-sm">
                  <DropdownTrigger>
                    <Button variant="bordered">
                      <HiDotsHorizontal />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownItem textValue="Consulter">
                      <div className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-1 flex items-center  ">
                      <IoEyeSharp className="text-[20px] mr-2 " />
                        <button
                          onClick={() => handleCommande(items.id_magasin)}
                          className="text-[14px]"
                        >
                          Consulter 
                        </button>
                      </div>
                    </DropdownItem>
                    <DropdownItem textValue="Consulter">
                      <div className=" hover:bg-greenColor rounded-md  hover:text-white px-3 text-center py-1 flex items-center  ">
                        <FcCancel className="text-[20px] mr-2" />
                        <button
                          name="Annuler"
                          type="submit"
                          className="text-[14px]"
                          onClick={(e) =>
                            handleEtat(e  ,items.id_cmd)
                          }
                        >
                          Annuler
                        </button>
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </td>
            </tr>
          ))}
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

      {selected &&
        magasin
          .filter((itemMagasin) => itemMagasin.id_magasin === selected)
          .map((itemMagasin) => {
            // Filter commandes belonging to the current magasin
            const commandesForMagasin = commande.filter(
              (CmdItem) => CmdItem.id_magasin === itemMagasin.id_magasin
            );

            return commandesForMagasin.map((CmdItem) => (
              <table
                key={CmdItem.id_cmd}
                className="border rounded-t-md p-10 w-full mt-5"
              >
                <thead key={itemMagasin.id_magasin}>
                  <tr className="bg-grayLight rounded-t-md">
                    <td className="   bg-grayLightpy-5" colSpan="2">
                      <div className="  text-[17px] px-5  items-center font-bold text-darkColor flex   ">
                        <Image
                          src={itemMagasin.Logo_magasin}
                          className="bg-grayLight rounded-full border-2  mr-3 border-greenColor"
                          height={40}
                          width={40}
                          alt="logo"
                        />
                        {itemMagasin.Libelle_magasin}
                      </div>
                    </td>

                    <td className=" text-end  py-5" colSpan="2">
                      <button
                        className="px-5 "
                        onClick={() => handleCommande(null)}
                      >
                        <AiOutlineClose />
                      </button>
                    </td>
                  </tr>
                  <tr className="pt-5">
                    <td className="py-4 px-5 text-[14px] border-b font-semibold text-darkColor">
                      Produit
                    </td>
                    <td className="py-4 text-[14px] border-b font-semibold text-darkColor">
                      Référence
                    </td>
                    <td className="py-4 text-[14px] border-b font-semibold text-darkColor">
                      Total
                    </td>
                    <td className="py-4 text-[14px] border-b font-semibold text-darkColor">
                      Etat
                    </td>
                  </tr>
                </thead>

                <tbody>
                  {Detailscommande.flat()
                    .filter(
                      (itemFilter) =>
                        itemFilter.id_magasin === itemMagasin.id_magasin
                    )
                    .map((items, index) => {
                      const productItem = product.find(
                        (item) => item.id_prod === items.id_prod
                      );

                      return productItem ? (
                        <tr
                          key={`${productItem.id_prod}-${index}`}
                          className=""
                        >
                          <td className="px-5 py-2 text-[13.5px] flex items-center">
                            <Image
                              className="bg-grayLight rounded-md  "
                              src={productItem.Image_thumbnail}
                              width={50}
                              height={50}
                              alt="Image_thumbnail"
                            />
                            <Link
                              href={`/Catalogue/${productItem.id_prod}`}
                              className="text-greenColor mx-2 "
                            >
                              {productItem.Libelle_prod}
                            </Link>{" "}
                            x {items.Qte_dtcmd}
                          </td>
                          <td className="py-2 text-[13px]">
                            {productItem.Reference_prod}
                          </td>
                          <td className="py-2 text-[13px]">
                            {productItem.prix_prod * items.Qte_dtcmd} TND
                          </td>
                          <td className="pt-1 text-[12.5px]">
                            {CmdItem.etat_cmd === "en attente" ? (
                              <p className="text-yellow-500">en attente</p>
                            ) : CmdItem.etat_cmd === "approuvé" ? (
                              <p className="text-greenColor">Terminée</p>
                            ) : CmdItem.etat_cmd === "Annuler" ? (
                              <p className="text-red-400">Annuler</p>
                            ) : null}
                          </td>
                        </tr>
                      ) : null;
                    })}

                  {(() => {
                    const totalPrixdtcmd = Detailscommande.flat()
                      .filter(
                        (item) => item.id_magasin === itemMagasin.id_magasin
                      )
                      .reduce((sum, item) => sum + item.prix_Total_dtcmd, 0);

                    return (
                      <>
                        <tr className="text-[13.5px] font-semibold text-darkColor border-t">
                          <td className="pt-5 px-5">Sous-total :</td>
                          <td className="pt-5">{totalPrixdtcmd} TND</td>
                        </tr>
                        <tr className="text-[13.5px] font-semibold text-darkColor">
                          <td className="pt-2 px-5">Moyen de paiement :</td>
                          <td className="pt-2">Paiement à la livraison</td>
                        </tr>
                        <tr className="text-[16px] font-bold text-darkColor border-b mb-5">
                          <td className="pt-2 px-5 pb-5">Total :</td>
                          <td className="pt-2 pb-5">{totalPrixdtcmd} TND</td>
                        </tr>
                      </>
                    );
                  })()}
                </tbody>
              </table>
            ));
          })}

      <p className="text-start text-[20px] font-semibold text-darkColor mt-10 my-5">
        Adresse de facturation
      </p>
      <div className="space-y-2 text-start text-[13.5px] text-darkColor ">
        <p>
          <span className="font-semibold text-greenColor">
            Nom et Prénom :{" "}
          </span>
          {session.user.Prenom_user} {session.user.Nom_user}{" "}
        </p>

        <p>
          <span className="font-semibold text-greenColor">
            Numéro et nom de rue :{" "}
          </span>
          {adresse.rue_adr}
        </p>
        {ville
          .filter((item) => item.id_ville === adresse.id_ville)
          .map((filtereditem) => (
            <p key={filtereditem.id_ville}>
              <span className="font-semibold text-greenColor">Region : </span>
              {filtereditem.Libelle_ville}
            </p>
          ))}
        <p>
          <span className="font-semibold text-greenColor">Code postal : </span>
          {adresse.code_adr}
        </p>

        <p>
          <span className="font-semibold text-greenColor">
            Numéro de télephone :{" "}
          </span>
          {session.user.Telephone_user}{" "}
        </p>
      </div>
      <p className="mt-3 text-[13.5px]">
        <span className="font-semibold text-greenColor">E-mail : </span>
        {session.user.Email_user}{" "}
      </p>
    </div>
  );
};

export default DetailCommande;
