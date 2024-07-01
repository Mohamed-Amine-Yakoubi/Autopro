"use server";

export async function Get_AllCommande(id_magasin) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/Get_AllCommande/${id_magasin}`,
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

export async function getCommande(id_user) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/getOneCommandeByIdUser/${id_user}`,
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

export async function Get_AllCommandeUsers() {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/Get_AllCommandeUsers
`,
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

export async function getAllMainCommande(id_user) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/Get_AllMainCommande/${id_user}`,
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

export async function getMainCommande(id_MainCmd) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/Get_MainCommande/${id_MainCmd}`,
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

export async function getCommandeDetails(id_MainCmd) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/getdetailsCommande/${id_MainCmd}`,
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

export async function Get_AllCommandebydiMagasin(id_MainCmd, id_magasin) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/Get_AllCommandebydiMagasin/${id_MainCmd}/${id_magasin}`,
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

export async function Update_commande(id_MainCmd, id_magasin) {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/Update_commande/${id_MainCmd}/${id_magasin}`,
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

export async function SendMail_commande() {
  const res = await fetch(
    `http://localhost:4000/api/v1/commande/MailCommande`,
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
