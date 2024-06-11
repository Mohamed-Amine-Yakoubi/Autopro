"use server";
export async function addStore({ magasin }) {
  const res = await fetch(`http://localhost:4000/api/v1/magasin/addStore`, {
    method: "POST",
    body: magasin,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}

export async function getStoreByUserID(id_user) {
  const res = await fetch(
    `http://localhost:4000/api/v1/magasin/getStoreByUserID/${id_user}`
  );
  const data = await res.json();
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
}

export async function getAllStore() {
  const res = await fetch(`http://localhost:4000/api/v1/magasin/getAllStore`);
  const data = await res.json();
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
}

export async function UpdateStore(formData) {
  const res = await fetch(`http://localhost:4000/api/v1/magasin/updateStore`, {
    method: "PUT",
    body: formData, // No need for JSON.stringify()
  });

  const data = await res.json();
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
}

 

export async function getStoreByID(id_magasin) {
  const res = await fetch(
   `http://localhost:4000/api/v1/magasin/getStoreByID/${id_magasin}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}