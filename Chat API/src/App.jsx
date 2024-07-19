import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import ChatHistory from './Pages/ChatHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatHistory" element={<ChatHistory />} />
        
      </Routes>
    </Router>
  );
}

export default App;
