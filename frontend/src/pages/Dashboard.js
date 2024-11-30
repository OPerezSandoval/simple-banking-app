import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [balance, setBalance] = useState(500);
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleDeposit = (e) => {
    e.preventDefault();
    const newBalance = balance + parseFloat(amount || 0);
    setBalance(newBalance);
    setAmount('');
    alert(`Successfully deposited $${amount}`);
  };

  const handleLogout = () => {
    // Clear user data (if stored in localStorage/sessionStorage)
    localStorage.removeItem('user'); // Adjust as needed for your auth logic
    alert('You have been logged out!');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="text-center text-white">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <p className="text-xl mb-6">
        Your Balance: <span className="font-bold">${balance.toFixed(2)}</span>
      </p>
      <form onSubmit={handleDeposit} className="space-y-4">
        <input
          type="number"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full max-w-sm mx-auto px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full max-w-sm mx-auto bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
        >
          Deposit
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
