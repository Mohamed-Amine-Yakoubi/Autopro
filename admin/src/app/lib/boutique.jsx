export async function getAllStore() {
    const res = await fetch(
        `http://localhost:4000/api/v1/magasin/getAllStore`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
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
  export async function getOneVille(id_ville) {
    const res = await fetch(
        `http://localhost:4000/api/v1/Ville/Getville/${id_ville}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }