"use client";
import { GetDestination, GetMsgByIdUser } from "@/app/lib/Chat";
import { getAllStore, getStoreByID } from "@/app/lib/Magasin";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { io } from "socket.io-client";
import Autopro_logo from "../public/images/Autopro_logo.png";
import { FaUserCircle } from "react-icons/fa";

const Chat = ({props}) => {
  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";

  const [socket, setSocket] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [userMsg, setUserMsg] = useState([]);
  const [store, setStore] = useState([]);
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      const newSocket = io("http://localhost:4000");
      setSocket(newSocket);

      newSocket.emit("userLoggedIn", session.user.id_user);

      newSocket.on("message", (message) => {
        setInbox((prevMessages) => [
          ...prevMessages,
          { Expediteur: message.Expediteur, Contenu: message.Contenu },
        ]);
      });

      newSocket.on("activeUsers", (users) => {
        setActiveUsers(users);
      });

      newSocket.on("conversationsList", (users) => {
        setConversations(users);
      });

      return () => {
        newSocket.disconnect();
        newSocket.off("activeUsers");
        newSocket.off("conversationsList");
      };
    }
  }, [session, status]);
  if (props && props.id) {
  console.log("sdfgsdf",props.id);
  }
  const handleSendMessage = () => {
    if (message && recipientId && session?.user?.id_user) {
      const newMessage = {
        contenu: message,
        Expediteur: session.user.id_user,
        recipientId,
      };
      socket.emit(
        "message",
        newMessage.contenu,
        newMessage.Expediteur,
        newMessage.recipientId
      );
      setInbox((prevMessages) => [
        ...prevMessages,
        { Expediteur: "You", Contenu: message },
      ]);
      setMessage("");
    } else {
      console.log("Please enter a message and select a recipient.");
    }
  };

  useEffect(() => {
    if (id_user) {
      console.log("Fetching messages for user:", id_user);
      GetMsgByIdUser(id_user)
        .then((itemMsg) => {
          setUserMsg(itemMsg);
        })
        .catch((error) => {
          console.error("Failed to fetch user messages:", error);
        });
    }
    getAllStore().then((item) => {
      setStore(item);
    });
  }, [id_user]);
  useEffect(() => {
    if (props ) {
      setRecipientId(props);
    }
  }, [props]);
console.log("recipientId",recipientId)
  const handleRecipientClick = (recipientId) => {
    setRecipientId(recipientId);
    fetchConversation(recipientId);
  };
  const fetchConversation = async (recipientId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/chat/conversation/${id_user}/${recipientId}`
      );
      const data = await response.json();
      setInbox(data);
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
    }
  };


  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="  ">
      <div className="flex lg:flex-row flex-col  ">
  
        <div className="flex flex-col lg:py-8    px-3     bg-white ">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <Image
              className="   "
              src={Autopro_logo}
              height={150}
              width={150}
              alt="logo"
            />
          </div>
          <div className="flex flex-col items-center bg-grayLight border border-gray-200 mt-4  py-6 px-5  rounded-lg">
            <div className="  text-[70px] ">
              <FaUserCircle />
            </div>
            <div className="text-sm font-semibold mt-2">
              {session.user.Prenom_user} {session.user.Nom_user}
            </div>
            <div className="text-xs text-gray-500  ">
              {session.user.Email_user}
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Discussions</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                {conversations.length}
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2  mb-5 overflow-y-scroll">
              <ul>
                {conversations.map((user, index) => {
                  const storeRes = store.filter(
                    (Item) => Item.id_magasin === user
                  );
                  return storeRes.map((StoreItem) => (
                    <button
                      value={recipientId}
                      onClick={() => handleRecipientClick(StoreItem.id_magasin)}
                      key={index}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <Image
                        className="bg-grayLight border border-greenColor rounded-full"
                        src={StoreItem.Logo_magasin}
                        height={35}
                        width={35}
                        alt="logo"
                      />
                      <span className="text-[13.5px]">
                        {StoreItem.Libelle_magasin}
                      </span>
                    </button>
                  ));
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-full     h-full p-6">
          <div className="  py-3 bg-gray-200 rounded-t-2xl border-b">
            {store
              .filter((item) => item.id_magasin === recipientId)
              .map((item, index) => (
                <div key={index} className="flex mx-3 space-x-2 items-center ">
                  <Image
                    className="bg-grayLight border border-greenColor rounded-full"
                    src={item.Logo_magasin}
                    height={35}
                    width={35}
                    alt="logo"
                  />
                  <p>{item.Libelle_magasin}</p>
                </div>
              ))}
          </div>
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-b-2xl bg-grayLight h-full p-4">
            <div className="flex flex-col h-[400px] overflow-y-scroll">
              {inbox.map((msg, index) => {
                const storeRes = store.find(
                  (Item) => Item.id_magasin === msg.Expediteur
                );

                return (
                  <div
                    key={index}
                    className={`border rounded px-2 py-2 ${
                      msg.Expediteur === session.user.id_user
                        ? "self-end"
                        : "self-start"
                    } relative text-sm ${
                      msg.Expediteur === session.user.id_user
                        ? "bg-green-100"
                        : "bg-white"
                    } my-1 py-2  shadow rounded-xl`}
                  >
                    <div className="flex items-center">
                      {storeRes && (
                        <Image
                          className="bg-grayLight border border-greenColor rounded-full"
                          src={storeRes.Logo_magasin}
                          height={35}
                          width={35}
                          alt="logo"
                        />
                      )}
                      <div className="ml-2">{msg.Contenu}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div className="flex-grow  ">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter message"
                  className="flex w-full border rounded-xl focus:outline-none focus:border-greenColor pl-4 h-10"
                />
              </div>
              <div className="ml-4">
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center bg-greenColor hover:bg-darkColor rounded-full text-white px-2 py-2 flex-shrink-0"
                >
                  <span className="">
                    <IoIosSend />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
