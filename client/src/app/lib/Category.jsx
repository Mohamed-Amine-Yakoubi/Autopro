"use server"
export async function getCategory(id_cat) {
    const res = await fetch(
        `http://localhost:4000/api/v1/category/getcategory/${id_cat}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }

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
  export async function getVille() {
    const res = await fetch(
        `http://localhost:4000/api/v1/Ville/GetAllville`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }