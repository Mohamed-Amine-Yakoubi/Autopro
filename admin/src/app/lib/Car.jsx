"use server"
export async function getAllMarque() {
    const res = await fetch(
        `http://localhost:4000/api/v1/Marque/GetAllMarque`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }
  /****************Get_ModeleByIdMarque************* */
  export async function  MarqueById(id_Marque) {
    const res = await fetch(
      `http://localhost:4000/api/v1/Marque/GetMarqueById/${id_Marque}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return data;
  }


  /****************Get_ModeleByIdMarque************* */
  export async function  ModeleByIdMarque(id_Marque,annee_modele) {
    const res = await fetch(
      `http://localhost:4000/api/v1/Modele/Get_ModeleByIdMarque/${id_Marque}?annee_modele=${annee_modele}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return data;
  }


  /****************Get_ModeleByIdMarque************* */
  export async function  MotoreByIdModele(id_Modele) {
    const res = await fetch(
      `http://localhost:4000/api/v1/Motorisation/Get_SpecMotorsByIdModel/${id_Modele}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return data;
  }

 /***********************************************/
 export async function getAllMatter() {
  const res = await fetch(
      `http://localhost:4000/api/v1/product/Get_AllMatter`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

 /***********************************************/
 export async function getMatterById(id_mat) {
  const res = await fetch(
      `http://localhost:4000/api/v1/product/Get_MatterById/${id_mat}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}