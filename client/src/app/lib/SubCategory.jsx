"use server"
export async function getSubCategory(id_cat) {
    const res = await fetch(
        `http://localhost:4000/api/v1/subcategory/getSubcategorybyidCat/${id_cat}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }