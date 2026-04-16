import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/login');
  };

  return (
    <nav className="kode-mono-fontStyle bg-cyan-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">EchoBoard</div>
      <div className="space-x-4">
        <Link to="/echowall" className="hover:text-gray-300">EchoWall</Link>
        <Link to="/echochat" className="hover:text-gray-300">EchoChat</Link>
        <Link to="/echoai" className="hover:text-gray-300">EchoAI</Link>
        <Link to="/manageprofile" className="hover:text-gray-300">Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
