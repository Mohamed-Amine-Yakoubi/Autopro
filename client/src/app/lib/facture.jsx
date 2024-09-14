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

  export async function getFactureByIdCmd(id_MainCmd) {
   
    const res = await fetch(
      `http://localhost:4000/api/v1/facture/getFacturebyIdCmd`,
  
      {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id_MainCmd}),
      });
   
    const data = await res.json();
    if (data.length > 0) {
      return data;
    } else {
      return null;
    }
  }
  export async function getFactureByIdUser(id_user) {
   
    const res = await fetch(
      `http://localhost:4000/api/v1/facture/getFacturebyIdUser/${id_user}`,
  
      {
        method:"GET",
        headers: {
          "Content-Type": "application/json",
        },
 
      });
   
    const data = await res.json();
    if (data.length > 0) {
      return data;
    } else {
      return null;
    }
  }

  export async function getAllfacture() {
    const res = await fetch(
        `http://localhost:4000/api/v1/facture/GetAllFacture`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }