import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { useUser } from '../context/UserContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      await deleteTask(task._id);
      setShowDeleteModal(false); // Close the modal after confirming
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  const renderPriority = (priority) => {
    return "★".repeat(priority) + "☆".repeat(3 - priority);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p>Status: <span className={task.status === 'Completed' ? 'text-green-500' : 'text-orange-500'}>{task.status}</span></p>
      <p>Priority: <span className="text-yellow-500">{renderPriority(task.priority)}</span></p>
      <div className="flex justify-end space-x-2 mt-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={() => setShowEditModal(true)}
        >
          Edit
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
      </div>
      {showEditModal && <EditTaskModal task={task} updateTask={updateTask} onClose={() => setShowEditModal(false)} />}
      <DeleteConfirmationModal isOpen={showDeleteModal} onCancel={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default TaskItem;
