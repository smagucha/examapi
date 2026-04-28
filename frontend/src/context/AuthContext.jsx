import React, { createContext, useState, useEffect } from "react";
import api from "../components/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
    user: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔐 LOGIN (NEW - IMPORTANT)
  const login = async (data) => {
    const res = await api.post("/useraccount/login/", data);

    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);

    setAuth({
      access: res.data.access,
      refresh: res.data.refresh,
      user: null,
    });

    await fetchUser(); // immediately load user
  };

  // 🔄 Refresh token (FIXED)
  const refreshToken = async () => {
    try {
      const res = await api.post("/token/refresh/", {
        refresh: auth.refresh || localStorage.getItem("refresh_token"),
      });

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

  // 🔁 Axios interceptors
  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = auth.access || localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const newAccess = await refreshToken();

          if (newAccess) {
            originalRequest.headers.Authorization = `Bearer ${newAccess}`;
            return api(originalRequest);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.access, auth.refresh]);

  // 👤 Fetch user
  const fetchUser = async () => {
    try {
      const res = await api.get("/useraccount/me/");
      setAuth((prev) => ({
        ...prev,
        user: res.data,
      }));
    } catch (err) {
      setAuth((prev) => ({
        ...prev,
        user: null,
      }));
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load user on app start
  useEffect(() => {
    if (auth.access) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setAuth({
      access: null,
      refresh: null,
      user: null,
    });

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        login, // 🔥 ADD THIS
        logout,
        refreshToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}