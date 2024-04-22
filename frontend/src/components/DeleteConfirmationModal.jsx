import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  // If the modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold text-center mb-4">Confirm Deletion</h2>
        <p className="text-center text-gray-700 mb-8">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
