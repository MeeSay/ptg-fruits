import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full px-8 py-4 bg-black">
      <div className="flex items-center gap-4 text-xl font-bold">
        <div className="flex items-center justify-center text-2xl font-bold text-yellow-300 mr-6">
          PTG FRUITS
        </div>
        <Link
          href="/exchange"
          className="text-white hover:cursor hover:text-yellow-300 transition"
        >
          TRAO ĐỔI
        </Link>
        <Link
          href="/calculator"
          className="text-white hover:cursor hover:text-yellow-300 transition"
        >
          TÍNH GIÁ TRỊ
        </Link>
      </div>

      {!user && (
        <div className="absolute top-4 right-6 flex gap-2">
          <button
            className="text-black font-bold px-2 py-1 bg-yellow-600 rounded-2xl hover:cursor hover:bg-yellow-700 transition"
            onClick={() => router.push("/signin")}
          >
            Đăng nhập
          </button>
          <button
            className="text-black font-bold px-2 py-1 bg-yellow-600 rounded-2xl hover:cursor hover:bg-yellow-700 transition"
            onClick={() => router.push("/signup")}
          >
            Đăng ký
          </button>
        </div>
      )}

      {user && (
        <div className="absolute top-4 right-6 flex gap-2">
          <span className="text-yellow-300 font-semibold mr-2 flex items-center">
            {user.displayName || user.email}
          </span>
          <button
            className="text-black font-bold px-2 py-1 bg-yellow-600 rounded-2xl hover:cursor hover:bg-yellow-700 transition"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
