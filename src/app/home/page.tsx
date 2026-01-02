"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Chào mừng đến với PTGFruit!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Trang web bán trái cây tươi sạch, chất lượng cao, giao hàng tận nơi.
        </p>
        <div className="flex gap-8 justify-center items-center">
          <div
            className="bg-white rounded-lg shadow p-6"
            onClick={() => router.push("/caculator")}
          >
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Tính toán
            </h2>
            <p className="text-gray-600">Giá trị các loại trái cây.</p>
          </div>
          <div
            className="bg-white rounded-lg shadow p-6"
            onClick={() => router.push("/exchange")}
          >
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Trao đổi
            </h2>
            <p className="text-gray-600">Trái cây thời gian thực.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
