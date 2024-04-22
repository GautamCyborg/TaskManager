import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [validToken, setValidToken] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    // Check user authentication status on load
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/validate', {
          withCredentials: true
        });
        if (response.data.Status) {
          setValidToken(true);
          const storedUser = JSON.parse(localStorage.getItem("user"));
          if (storedUser) {
            setUser({ ...user, username: storedUser.username }); // Update user with username
            fetchTasks(storedUser.username, storedUser.token); // Fetch tasks with username and token
          }
        } else {
          setValidToken(false);
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    // Rehydrate tasks from local storage on app start
    const tasksFromStorage = localStorage.getItem("tasks");
    if (tasksFromStorage) {
      setTasks(JSON.parse(tasksFromStorage));
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      const response = await axios.post("http://localhost:5000/createTask", taskData, {
        headers: { Authorization: `Bearer ${user.token}` } // Use the user token
      });
      // Update tasks state and local storage
      setTasks(currentTasks => {
        const updatedTasks = [...currentTasks, response.data];
        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error.response ? error.response.data : error);
      throw error; // Throw error to be potentially caught and handled by the calling component
    }
  };

  const fetchTasks = async (username, token) => {
    if (!username) return;  // Check if user or user.username is null or undefined
    try {
      const response = await axios.get(`http://localhost:5000/${username}`, {
        headers: { Authorization: `Bearer ${token}` } // Use the token
      });
      setTasks(response.data);
      localStorage.setItem("tasks", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", userData);
      Cookies.set("token", response.data.token);
      setUser({ username: response.data.username, token: response.data.token });
      await fetchTasks(response.data.username, response.data.token);  // Fetch tasks right after setting user
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response);
      throw error;
    }
  };

  const login = async (creds) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", creds);
      Cookies.set("token", response.data.token);
      setUser({ username: response.data.username, token: response.data.token });
      localStorage.setItem("user", JSON.stringify({ username: response.data.username, token: response.data.token }));
      await fetchTasks(response.data.username, response.data.token);  // Fetch tasks right after setting user
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    alert("Logged Out Successfully");
    setUser(null); // Set user to null instead of "user"
    setTasks([]);
  };

  const updateTask = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/update/${updatedTask._id}`, updatedTask);

      // Update the tasks in the state
      setTasks(currentTasks => {
        const updatedTasks = currentTasks.map(task => {
          if (task._id === updatedTask._id) {
            // Spread the existing task and overwrite with updated task data
            return { ...task, ...updatedTask };
          }
          return task;
        });
        // Update local storage with the new tasks array
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });

    } catch (error) {
      console.error("Error updating task:", error.response ? error.response.data : error);
      alert("Failed to update task: " + (error.response ? error.response.data.message : error.message));
    }
  };

  const deleteTask = async (taskId) => {
    try {
      // Send a request to the backend to delete the task
      await axios.delete(`http://localhost:5000/delete/${taskId}`);

      // If successful, update the state to filter out the deleted task
      setTasks(currentTasks => {
        const updatedTasks = currentTasks.filter(task => task._id !== taskId);
        // Also update local storage to reflect this change
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });

    } catch (error) {
      console.error("Error deleting task:", error.response ? error.response.data : error);
      alert("Failed to delete task: " + (error.response ? error.response.data.message : error.message));
    }
  };


  const value = {
    user,
    tasks,
    signUp,
    login,
    logout,
    addTask,
    updateTask,
    deleteTask,
    validToken,
    setValidToken,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

