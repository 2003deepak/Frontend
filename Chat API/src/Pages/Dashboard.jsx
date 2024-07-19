import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false); // Check isLoggedIn state from localStorage

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://chat-api-blond.vercel.app/generate/${input}`);
      const newChat = { question: input, answer: response.data.message };
      setChatHistory([...chatHistory, newChat]);
      setInput(''); // Clear input after submission
    } catch (error) {
      console.error('Error fetching response:', error);
      // Handle error display
    }
  };

  const handleCloseChat = async () => {
    try {
      let response = await axios.post('https://chat-api-blond.vercel.app//saveChat', {
        chatHistory: chatHistory,
        email: localStorage.getItem('userId'), // Replace this with the actual user email if available
      });

      setChatHistory([]);
      setMessage(response.data.message);

    } catch (error) {
      console.error('Error saving chat history:', error);
      // Handle error display
    }
  };

  const handleLogout = async () => {
    try {
      // Perform logout API call if needed, then clear localStorage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error display
    }
  };

  const handleChatHistoryRedirect = () => {
    navigate('/chatHistory');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          onClick={handleChatHistoryRedirect}                  
        >
          Chat History
        </button>
        <button
          onClick={handleCloseChat}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Close Chat
        </button>
        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          Logout
        </button>
      </div>

      {/* Chat history */}
      <div className="flex flex-col mb-4 space-y-4 h-5/6 overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        {chatHistory.map((chat, index) => (
          <div key={index} className="p-3 rounded-lg shadow-inner bg-gray-100">
            <p className="font-bold">{chat.question} ?</p>
            <p>{chat.answer}</p>
          </div>
        ))}
      </div>

      {/* User input */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          placeholder="Ask a question..."
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
