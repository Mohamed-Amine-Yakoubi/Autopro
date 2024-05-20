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