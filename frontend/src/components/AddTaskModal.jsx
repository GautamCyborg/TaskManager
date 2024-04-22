import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const AddTaskModal = ({ isOpen, onClose }) => {
  const { user, addTask } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState(1);
  const userAssociated = user ? user.username : null; // Ensure user is available
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      try {
        await addTask({ title, description, status, priority, userAssociated });
        setTitle('');
        setDescription('');
        setStatus('Pending');
        setPriority(1);
        onClose(); // Close the modal on success
      } catch (error) {
        alert('Failed to add task: ' + (error.response?.data?.message || error.message)); // Display error message
      }
    } else {
      alert('Title and description are required.');
    }
  };

  // If the modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Task</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
              Priority
            </label>
            <select id="priority" value={priority} onChange={(e) => setPriority(parseInt(e.target.value, 10))} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value={1}>1 Star (Low)</option>
              <option value={2}>2 Stars (Medium)</option>
              <option value={3}>3 Stars (High)</option>
            </select>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
