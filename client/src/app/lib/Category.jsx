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