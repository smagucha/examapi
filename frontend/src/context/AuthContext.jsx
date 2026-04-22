import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
    user: null,
  });

  // 🔄 Refresh token function
  const refreshToken = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/token/refresh/",
        { refresh: auth.refresh }
      );

      localStorage.setItem("access_token", res.data.access);

      setAuth((prev) => ({
        ...prev,
        access: res.data.access,
      }));

      return res.data.access;
    } catch (err) {
      logout();
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth({ access: null, refresh: null, user: null });
    window.location.href = "/login";
  };

  // ⏳ Auto refresh before expiry (every 4 min for example)
  useEffect(() => {
    const interval = setInterval(() => {
      if (auth.refresh) {
        refreshToken();
      }
    }, 300 * 60 * 1000); // 4 minutes

    return () => clearInterval(interval);
  }, [auth.refresh]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}