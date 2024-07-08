"use server"
export async function getSubCategoryByIdCat(id_cat) {
  const res = await fetch(
      `http://localhost:4000/api/v1/subcategory/getSubcategorybyidCat/${id_cat}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
}
export async function getSubCategory(id_subcat) {
    const res = await fetch(
        `http://localhost:4000/api/v1/subcategory/getSubcategory/${id_subcat}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }