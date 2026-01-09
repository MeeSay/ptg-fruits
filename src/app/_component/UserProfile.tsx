"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import authService from "../services/authService";

export default function UserProfile() {
  const { user, logout, loading, getIdToken } = useAuth();

  useEffect(() => {
    // Khi user đăng nhập, lấy token và lưu vào authService
    const saveToken = async () => {
      if (user) {
        const token = await getIdToken();
        if (token) {
          authService.setToken(token);
          console.log("Token saved:", token);
        }
      } else {
        authService.clearToken();
      }
    };

    saveToken();
  }, [user, getIdToken]);

  const handleLogout = async () => {
    try {
      await logout();
      authService.clearToken();
      window.location.href = "/signin";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <a
          href="/signin"
          className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          Đăng nhập
        </a>
        <a
          href="/signup"
          className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
        >
          Đăng ký
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium">
            {user.email?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">
          {user.displayName || user.email}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium"
      >
        Đăng xuất
      </button>
    </div>
  );
}
