import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import UserController from "../controller/UserController";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null when not logged in
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const unsetUser = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const token = await UserController.login(email, password);
      localStorage.setItem("token", token);
      setToken(token); // triggers effect

      const userDetails = await UserController.getUserDetails(token);
      setUser({ id: userDetails._id, isAdmin: userDetails.isAdmin });
      localStorage.setItem("userData", JSON.stringify(userDetails));
      
      return { token, user: userDetails };
    } catch (error) {
      unsetUser(); // in case of error, clear user/token
      throw error;
    }
  };

  const register = async (userData) => {
    return await UserController.register(userData);
  };

  const forgotPassword = async (email) => {
    return await UserController.forgotPassword(email);
  };

  // Auto-login on app load if token is available
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);

    UserController.getUserDetails(token)
      .then((userDetails) => {
        setUser({ id: userDetails._id, isAdmin: userDetails.isAdmin });
        localStorage.setItem("userData", JSON.stringify(userDetails));
      })
      .catch((err) => {
        unsetUser();
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        unsetUser,
        loading,
        login,
        register,
        forgotPassword,
        getUserDetails: UserController.getUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
