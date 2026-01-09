"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update profile with display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      return userCredential.user;
    } catch (error: unknown) {
      console.error("Sign up error:", error);

      // Parse Firebase error codes
      const errorCode = (error as { code?: string }).code;
      let errorMessage = "Đăng ký thất bại";

      switch (errorCode) {
        case "auth/admin-restricted-operation":
          errorMessage =
            '⚠️ QUAN TRỌNG: Email/Password authentication chưa được bật trong Firebase Console.\n\nVui lòng làm theo:\n1. Truy cập: https://console.firebase.google.com/project/management-3fa0a/authentication/providers\n2. Click "Email/Password"\n3. Bật "Enable"\n4. Click "Save"';
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email này đã được sử dụng";
          break;
        case "auth/invalid-email":
          errorMessage = "Email không hợp lệ";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Phương thức đăng ký chưa được kích hoạt. Vui lòng bật Email/Password trong Firebase Console";
          break;
        case "auth/weak-password":
          errorMessage = "Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn";
          break;
        default:
          errorMessage =
            (error as { message?: string }).message || "Đăng ký thất bại";
      }

      throw new Error(errorMessage);
    }
  };

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error: unknown) {
      console.error("Sign in error:", error);

      const errorCode = (error as { code?: string }).code;
      let errorMessage = "Đăng nhập thất bại";

      switch (errorCode) {
        case "auth/user-not-found":
          errorMessage = "Không tìm thấy tài khoản với email này";
          break;
        case "auth/wrong-password":
          errorMessage = "Mật khẩu không đúng";
          break;
        case "auth/invalid-email":
          errorMessage = "Email không hợp lệ";
          break;
        case "auth/user-disabled":
          errorMessage = "Tài khoản đã bị vô hiệu hóa";
          break;
        case "auth/too-many-requests":
          errorMessage = "Quá nhiều lần thử. Vui lòng thử lại sau";
          break;
        default:
          errorMessage =
            (error as { message?: string }).message || "Đăng nhập thất bại";
      }

      throw new Error(errorMessage);
    }
  };

  const signInWithGoogle = async (): Promise<User> => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error: unknown) {
      console.error("Google sign in error:", error);

      const errorCode = (error as { code?: string }).code;
      let errorMessage = "Đăng nhập với Google thất bại";

      switch (errorCode) {
        case "auth/popup-closed-by-user":
          errorMessage = "Bạn đã đóng cửa sổ đăng nhập";
          break;
        case "auth/popup-blocked":
          errorMessage = "Popup bị chặn. Vui lòng cho phép popup cho trang này";
          break;
        case "auth/operation-not-allowed":
          errorMessage =
            "Đăng nhập Google chưa được kích hoạt trong Firebase Console";
          break;
        default:
          errorMessage =
            (error as { message?: string }).message ||
            "Đăng nhập với Google thất bại";
      }

      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error: unknown) {
      throw new Error(
        (error as { message?: string }).message || "Failed to log out"
      );
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw new Error(
        (error as { message?: string }).message || "Failed to send reset email"
      );
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    try {
      if (!user) return null;
      const token = await user.getIdToken();
      return token;
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    getIdToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
