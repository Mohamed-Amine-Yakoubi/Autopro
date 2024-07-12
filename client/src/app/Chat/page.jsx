
"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState([]);
const destinataire=87;
const Expediteur=40;

  useEffect(() => {
    // Fetch conversations or users from backend API
    fetchConversations(); // Example function to fetch conversations

    // Socket.io event listeners
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchConversations = async () => {
    try {
      // Example fetch request to your backend API
      const response = await fetch(`http://localhost:4000/api/v1/chat/GetDestination/${destinataire}/${Expediteur}`);
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      const data = await response.json();
      setConversations(data); // Assuming data is an array of conversations/users
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = () => {
    const message = { senderId: 'user1', receiverId: 'user2', message: messageInput };
    socket.emit('chat message', message);
    setMessageInput('');
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">Conversations</h2>
        <ul>
          {conversations.map((conversation, index) => (
            <li key={index} className="cursor-pointer mb-2">
              {conversation.name} {/* Display conversation or user name */}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Main chat area */}
      <div className="w-3/4 p-4">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
        <div className="flex">
          <input
            type="text"
            className="w-full border p-2"
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
