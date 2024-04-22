import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = ({ userName, tasks }) => {
  const navigate = useNavigate();
  const { logout } = useUser();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-purple-300">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 p-5 mb-4 text-center">
          Hello, <span className="text-blue-500">{userName || "User"}</span>!
        </h1>
        <TaskList tasks={tasks} />
        <button onClick={() => setShowLogoutConfirmation(true)} className="fixed bottom-4 right-4 rounded-full bg-blue-500 p-3 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h1m0 0h-1V9h1m3 7h-5V9h5m2-5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2z"></path></svg>
        </button>
        {showLogoutConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-lg text-center">Are you sure you want to log out?</h2>
              <div className="flex justify-around mt-4">
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Confirm
                </button>
                <button onClick={() => setShowLogoutConfirmation(false)} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
