import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const { authToken, setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    } else {
      fetchBalance();
    }
  }, [authToken, navigate]);

  const fetchBalance = async () => {
    try {
      const res = await axios.get('/api/users/balance', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBalance(res.data.balance);
    } catch (err) {
      console.error(err.response.data);
      alert('Failed to fetch balance.');
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        '/api/users/deposit',
        { amount: parseFloat(amount) },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setBalance(res.data.balance);
      setAmount('');
      alert(`Successfully deposited $${amount}`);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || 'Deposit failed.');
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('tokens');
    navigate('/');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your Balance: ${balance}</p>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          step="0.01"
          placeholder="Deposit Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Deposit</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;

