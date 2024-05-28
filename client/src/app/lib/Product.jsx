"use server"
export async function getAllProducts() {
    const res = await fetch(
      "http://localhost:4000/api/v1/product/GetAllProducts"
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } 
    return data;
  }

  export async function getSpecProduct(id_prod) {
    const res = await fetch(
      `http://localhost:4000/api/v1/product/get_specProduct/${id_prod}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } 
    return data;
  }

  export async function getProductbyUserId(id_user) {
    const res = await fetch(
      `http://localhost:4000/api/v1/product/Get_spec_ProductByIdUser/${id_user}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } 
    return data;
  }


  export async function deleteProduct(id_prod) {
    const res = await fetch(
      `http://localhost:4000/api/v1/product/DeleteProduct/${id_prod}`, {
        method: "DELETE",
      });
     
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } 
    return data;
  }