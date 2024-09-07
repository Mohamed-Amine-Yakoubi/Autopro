"use server";
export async function getAllMarque() {
  const res = await fetch(`http://localhost:4000/api/v1/Marque/GetAllMarque`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
/****************Get_ModeleByIdMarque************* */
export async function MarqueById(id_Marque) {
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
export async function ModeleByIdMarque(id_Marque, annee_modele) {
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
export async function MotoreByIdModele(id_Modele) {
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
  const res = await fetch(`http://localhost:4000/api/v1/product/Get_AllMatter`);
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

/***********************************************/
export async function GetAllModele() {
  const res = await fetch(`http://localhost:4000/api/v1/modele/GetAllModele`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
/***********************************************/
export async function GetAllMotors() {
  const res = await fetch(
    `http://localhost:4000/api/v1/Motorisation/GetAllMotors`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

/***********************************************/
export async function getAllCategories() {
  const res = await fetch(
    `http://localhost:4000/api/v1/category/getAllCategories`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
/***********************************************/
export async function GetAllsubCategories() {
  const res = await fetch(
    `http://localhost:4000/api/v1/subcategory/GetAllsubCategories`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
/***************add marque*************** */
export async function AddMarque(Libelle_marque) {
  const res = await fetch(`http://localhost:4000/api/v1/Marque/AddMarque`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Libelle_marque }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
/***************add modele*************** */
export async function AddModele(Libelle_modele,id_marque,annee_modele) {
  const res = await fetch(`http://localhost:4000/api/v1/Modele/AddModele`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Libelle_modele,annee_modele,id_marque}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
/***************add motor*************** */
export async function AddMotor(Libelle_motor, id_modele) {
  const res = await fetch(`http://localhost:4000/api/v1/Motorisation/AddMotor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Libelle_motor, id_modele}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
 
/***************delete piéce*************** */
export async function DeletePiece(id_cat) {
  const res = await fetch(`http://localhost:4000/api/v1/category/deletecategory`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id_cat}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
/***************delete subcat*************** */
export async function DeletesousPiece( id_subcat) {
  const res = await fetch(`http://localhost:4000/api/v1/subcategory/DeleteSubcat`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id_subcat}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
/***************delete marque*************** */
export async function DeleteMarque(id_marque) {
  const res = await fetch(`http://localhost:4000/api/v1/marque/DeleteMarque`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id_marque}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
/***************delete modele*************** */
export async function DeleteModele(id_modele) {
  const res = await fetch(`http://localhost:4000/api/v1/modele/DeleteModele`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id_modele}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
/***************delete motor*************** */



export async function DeleteMotor(id_motor) {
  const res = await fetch(`http://localhost:4000/api/v1/motorisation/DeleteMotor`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id_motor}),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } 

  return data;
}
 