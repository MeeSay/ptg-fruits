import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <div className="w-full px-8 py-4 bg-black">
      <div className="flex items-center gap-4 text-xl font-bold">
        <div className="flex items-center justify-center text-2xl font-bold text-yellow-300 mr-6">
          PTG FRUITS
        </div>
        <Link href="/exchange" className="text-white">
          TRAO ĐỔI
        </Link>
        <Link href="/calculator" className="text-white">
          TÍNH GIÁ TRỊ
        </Link>
      </div>

      <div className="absolute top-4 right-6 flex gap-2">
        <button
          className="text-white font-bold px-2 py-1 bg-green-600 rounded-2xl hover:cursor hover:bg-green-700 transition"
          onClick={() => router.push("/login")}
        >
          Đăng nhập
        </button>
        <button
          className="text-white font-bold px-2 py-1 bg-green-600 rounded-2xl hover:cursor hover:bg-green-700 transition"
          onClick={() => router.push("/register")}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}
