"use server";
export async function GetAllUsersClaim() {
  const res = await fetch(
    "http://localhost:4000/api/v1/user/GetAllUsersClaim",
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}

export async function GetClaimStoreId(id_magasin) {
  const res = await fetch(
    `http://localhost:4000/api/v1/user/GetClaimStoreId/${id_magasin}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return data;
}
