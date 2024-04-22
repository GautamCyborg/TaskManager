import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      alert('Login successful:');
      navigate('/Home'); // or wherever you want to redirect after login
    } catch (error) {
      alert('Login Failed:');
      console.error('Login failed:', error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-300">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input id="email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300" />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={handleChange} value={formData.password} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-blue-300" />
              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-1/3 right-0 pr-3 transform -translate-y-1/3 flex items-center text-sm leading-5">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
              Login
            </button>
            <div>
              <a href="/signup" className="text-blue-500 hover:text-blue-700 text-sm font-bold">Don't have an account? Sign Up</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
