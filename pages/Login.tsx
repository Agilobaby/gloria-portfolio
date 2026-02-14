import React, { useState } from 'react';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.hash = '#/admin';
      window.location.reload();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4E5EA] dark:bg-dark-bg transition-colors duration-300">
      <div className="bg-white dark:bg-dark-card p-8 shadow-lg rounded-sm w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-sm focus:outline-none focus:border-primary bg-white dark:bg-[#050505] text-gray-800 dark:text-white transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-sm focus:outline-none focus:border-primary bg-white dark:bg-[#050505] text-gray-800 dark:text-white transition-colors"
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-black font-bold py-3 px-4 rounded-sm hover:opacity-80 transition-opacity">
            Login
          </button>
        </form>
        <p className="mt-4 text-xs text-center text-gray-400">Default: admin@example.com / password123</p>
      </div>
    </div>
  );
};

export default Login;