import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LOCAL_URL, DOMAIN_URL } from '../../config';

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('userId'); // Assume the user's email is stored in localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.post('https://chat-api-blond.vercel.app/getChat', { email }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setChatHistory(response.data.message);
      } catch (error) {
        setError('Failed to fetch chat history');
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [email]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      navigate('/'); // Redirect to home or login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Chat History</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col space-y-4 h-5/6 overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        {chatHistory.length > 0 ? (
          chatHistory.map((chat) => (
            <div key={chat._id} className="p-3 rounded-lg shadow-inner bg-gray-100">
              <p className="font-bold">{chat.question} ?</p>
              <p>{chat.answer}</p>
            </div>
          ))
        ) : (
          <p>No chat history found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
