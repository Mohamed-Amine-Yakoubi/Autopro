"use server"
export async function GetMsgByIdUser(id_user) {
    const res = await fetch(
        `http://localhost:4000/api/v1/chat/GetMsgByIdUser/${id_user}`,
        {next:{
          revalidate : 10
        }}
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }

 
  export async function GetDestination(destinataire,Expediteur) {
    const res = await fetch(
        `http://localhost:4000/api/v1/chat/GetDestination/${destinataire}/${Expediteur}`,
        {next:{
          revalidate : 10
        }}
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
 
    return data;
  }

 