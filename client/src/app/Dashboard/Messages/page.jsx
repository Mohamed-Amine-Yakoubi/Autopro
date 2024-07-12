"use client";
import { GetDestination, GetMsgByIdUser } from "@/app/lib/Chat";
// components/Chat.js

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const Messages = () => {
    const magasin = useSelector((state) => state.store);
  const { data: session, status } = useSession();
  const id_user = session?.user?.id_user || "";

  const [socket, setSocket] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [userMsg, setUserMsg] = useState([]);
  const [destMsg, setDestMsg] = useState([]);
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // State to store recipient's ID

  useEffect(() => {
    if (status === "authenticated") {
      const newSocket = io("http://localhost:4000");
      setSocket(newSocket);

      newSocket.emit("userLoggedIn", magasin.items[0].id_magasin);

      newSocket.on("message", (messages) => {
        if (Array.isArray(messages)) {
          setInbox(
            messages.map((msg) => ({
              Expediteur: msg.Expediteur,
              Contenu: msg.Contenu,
            }))
          );
        } else {
          console.error("Received invalid messages data:", messages);
        }
      });

      newSocket.on("message", (message) => {
        setInbox((prevMessages) => [
          ...prevMessages,
          { Expediteur: message.Expediteur, Contenu: message.Contenu },
        ]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [session, status]);

  const handleSendMessage = () => {
    if (message && recipientId && magasin.items[0].id_magasin) {
      const newMessage = {
        contenu: message,
        Expediteur: magasin.items[0].id_magasin,
        recipientId,
      }; // Message object
      socket.emit(
        "message",
        newMessage.contenu,
        newMessage.Expediteur,
        newMessage.recipientId
      ); // Send message object
      setInbox((prevMessages) => [
        ...prevMessages,
        { Expediteur: "You", Contenu: message },
      ]); // Update inbox with the new message
      setMessage("");
    } else {
      console.log("Please enter a message and select a recipient.");
    }
  };
  useEffect(() => {
    GetMsgByIdUser(id_user).then((itemMsg) => {
      setUserMsg(itemMsg);
      const GetDest = itemMsg.map((itemDest) => {
        GetDestination(itemDest.destinataire, magasin.items[0].id_magasin);
      });
      Promise.all(GetDest).then((getDestItem) => {
        setDestMsg(getDestItem);
      });
    });
  }, [id_user]);
  console.log("dest",destMsg);
  console.log("user",magasin.items[0].id_magasin);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className=" overflow-hidden flex items-center justify-center">
      <div className="flex  antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">QuickChat</div>
            </div>
            <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img
                  src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                  alt="Avatar"
                  className="h-full w-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">Aminos Co.</div>
              <div className="text-xs text-gray-500">Lead UI/UX Designer</div>
              <div className="flex flex-row items-center mt-3">
                <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                  <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                </div>
                <div className="leading-none ml-1 text-xs">Active</div>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  4
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                    H
                  </div>
                  <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col    ">
                {inbox.map((msg, index) => (
                  <div
                    key={index}
                    className={`border rounded px-4 py-2 ${
                      msg.Expediteur === session.user.id_user ||
                      msg.Expediteur === "You"
                        ? "self-end relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                        : "self-start relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl "
                    }`}
                  >
                    {msg.Expediteur}: {msg.Contenu}
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />
                  <input
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    type="text"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    placeholder="Recipient's ID"
                  />
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Messages;
