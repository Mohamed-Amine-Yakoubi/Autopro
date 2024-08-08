"use serveur"
export async function getFactureByIdStore(id_magasin) {
    const res = await fetch(
      `http://localhost:4000/api/v1/facture/getFacturebyIdStore/${id_magasin}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return data;
    } else {
      return null;
    }
  }