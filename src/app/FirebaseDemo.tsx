"use client";
import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  User,
} from "firebase/auth";
import app from "../firebaseConfig";

export default function FirebaseDemo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    signInAnonymously(auth);
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Đang kết nối Firebase...</div>;

  return (
    <div>
      {user ? (
        <div>Đã đăng nhập ẩn danh với UID: {user.uid}</div>
      ) : (
        <div>Chưa đăng nhập</div>
      )}
    </div>
  );
}
