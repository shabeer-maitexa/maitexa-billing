import React, { useState, useContext } from 'react';
import './Login.css';
import axiosInstance from '../Axios';
import { useAuth } from '../Context';  // Import the useAuth hook
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Get auth context values
  const { setToken, setUser, setUserId } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('auth/login/', { email, password });
      const { access, role } = response.data.data;

      if (access) {
        setToken(access);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="cards">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className='mt-3' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
