import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ gmail: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    try {
      const res = await axios.post(endpoint, form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h2>Create an account?</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="gmail" placeholder="Gmail" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" onClick={() => setIsLogin(false)}>Sign Up</button>
        </form>
      </div>

      <div className="auth-right">
        <h2>Already have an account.</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="gmail" placeholder="Gmail" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit" onClick={() => setIsLogin(true)}>Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignupPage;