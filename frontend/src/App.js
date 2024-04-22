import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useUser } from './context/UserContext';
import ProtectedRoute from './components/Protected';


const App = () => {
  const { user,tasks } = useUser();
  return (
       <BrowserRouter>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Home" element={<ProtectedRoute Component={Home} userName={user ? user.username : "User"} tasks={tasks}/>}/>
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
