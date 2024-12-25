import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('session');
    alert('Has cerrado sesión');
    navigate('/');
  };

  return (
    <div className="logout-section">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

