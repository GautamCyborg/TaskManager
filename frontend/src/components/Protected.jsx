import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ Component, ...props }) => {
  const { user, setValidToken } = useUser();

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Validate user session
        const response = await axios.get('http://localhost:5000/auth/validate', {
          withCredentials: true
        });
        setValidToken(response.data.status);
      } catch (error) {
        console.error('Error validating session:', error);
        setValidToken(false);
      }
    };

    validateSession();
  }, [setValidToken]);

  // Redirect to login page if user is not authenticated
  return user ? <Component {...props} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
