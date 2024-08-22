"use server";
export async function addFavoris(id_prod, id_user) {
  const favoris = { id_prod, id_user };

  const res = await fetch(`http://localhost:4000/api/v1/favoris/AddFavoris`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favoris),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}


export async function getfavorisByUserID(id_user) {
  const res = await fetch(
    `http://localhost:4000/api/v1/favoris/getFavorisByIdUser/${id_user}`
  );
  const data = await res.json();
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
}

export async function deleteFavoris(id_prod, id_user) {
  const res = await fetch(
    `http://localhost:4000/api/v1/favoris/DeleteFavoris/${id_prod}/${id_user}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();
  if (data.length > 0) {
    return data;
  } else {
    return null;
  }
}
