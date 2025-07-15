import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";
import UserProvider from "./context/UserProvider";
import MovieProvider from "./context/MovieProvider";
import CommentProvider from "./context/CommentProvider";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
// import Workout from "./pages/Workout/Workout";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Movies from "./pages/Movies/Movies";
import AdminDashboard from "./pages/AdminDashboard/AdminDashbard";



export default function App() {
  
  function AppRoutes() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/movies"
        element={
          user && user.role === "admin" ? <AdminDashboard /> : <Movies />
        }
      />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}


  return (
    <UserProvider>
        <MovieProvider>
          <CommentProvider>
      <Router>
      
      
                <AppNavBar />
                <main>
                  <AppRoutes />
                </main>
      
      
        
    </Router>
      </CommentProvider>
        </MovieProvider>
      </UserProvider>
  );
}
