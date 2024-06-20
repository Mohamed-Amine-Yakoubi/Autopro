"use server"
export async function getAllUsers() {
    const res = await fetch(
        `http://localhost:4000/api/v1/Marque/GetAllMarque`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }
  /****************Get_user ById ************* */
  export async function  getUser(id_user) {
    const res = await fetch(
      `http://localhost:4000/api/v1/user/GetUserById/${id_user}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return data;
  }

    /****************Get_adresse user ById ************* */
  export async function  getAdrByIdUser(id_user) {
    const res = await fetch(
      `http://localhost:4000/api/v1/user/GetAdrByIdUser/${id_user}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
  
    return data;
  }
