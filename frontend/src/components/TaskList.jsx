import React, { useState } from 'react';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';

const TaskList = ({ tasks }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('None');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const filterTasks = (tasks, filter) => {
    if (filter === 'All') return tasks;
    return tasks.filter(task => task.status === filter);
  };

  const sortTasks = (tasks, sort) => {
    return [...tasks].sort((a, b) => {
      if (sort === 'Priority') {
        return b.priority - a.priority;
      } else if (sort === 'Status') {
        return a.status.localeCompare(b.status);
      }
      return 0;
    });
  };

  const filteredTasks = filterTasks(tasks, filter);
  const sortedTasks = sortTasks(filteredTasks, sort);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg border-4 border-gray-300 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4 px-4">
        <div>
          <label htmlFor="filter" className="mr-2 text-blue-600">Filter by Status:</label>
          <select 
            id="filter" 
            value={filter} 
            onChange={handleFilterChange} 
            className="rounded-lg p-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2 text-green-600">Sort by:</label>
          <select 
            id="sort" 
            value={sort} 
            onChange={handleSortChange} 
            className="rounded-lg p-2 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200"
          >
            <option value="None">None</option>
            <option value="Priority">Priority</option>
            <option value="Status">Status</option>
          </select>
        </div>
      </div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {sortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedTasks.map(task => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tasks to display.</p>
        )}
      </div>
      <div className="flex justify-between items-center mb-4 mt-6 px-4">
        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>
      <AddTaskModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
};

export default TaskList;
