"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ChooseFruit from "../_component/ChooseFruit";

export default function CaculatorPage() {
  const [fruit, setFruit] = useState({
    name: "",
    icon: "",
  });
  const [fruitWeight, setFruitWeight] = useState<number>(0);
  const [fruitValue, setFruitValue] = useState<number>(0);
  const [variants, setVariants] = useState<string[]>([]);
  const [close, setClose] = useState<boolean>(false);
  const router = useRouter();

  const handleCaculator = () => {
    const totalPrice = fruitWeight;
    setFruitValue(totalPrice);
  };
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-green-100 px-6 py-4">
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
      <div className="flex flex-col items-center justify-center max-w-2xl w-full h-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Tính giá trị trái cây của bạn
        </h1>
        <div className="flex flex-col gap-6 items-center">
          <button
            className="text-white font-bold px-2 py-1 bg-green-600 rounded-2xl hover:cursor hover:bg-green-700 transition"
            onClick={() => setClose(true)}
          >
            Lựa chọn nông sản và biến thể
          </button>
          {close && (
            <ChooseFruit
              onClose={() => setClose(false)}
              onSubmit={(data) => {
                setFruit({ name: data.fruit.name, icon: data.fruit.icon });
                setVariants(data.variants);
                setClose(false);
              }}
            />
          )}
          {fruit.name && (
            <div className="text-2xl text-white font-semibold">
              Nông sản đã chọn: {fruit.icon} {fruit.name}{" "}
              {variants.length > 0 && `- Biến thể: ${variants.join(", ")}`}
            </div>
          )}
          <div className="flex gap-2 items-center justify-center">
            <p className="text-black text-lg">Nhập cân nặng</p>
            <input
              className="border border-gray-300 rounded p-2 text-green-500"
              placeholder="Cân nặng"
              value={fruitWeight}
              onChange={(e) => setFruitWeight(Number(e.target.value))}
            />
            <button
              className="bg-green-500 text-white rounded p-2 hover:cursor hover:bg-green-600 transition"
              onClick={handleCaculator}
            >
              Tính giá trị
            </button>
          </div>
        </div>
        {fruitValue != 0 && (
          <div className="mt-6 text-xl text-green-800 font-semibold">
            Giá trị trái cây của bạn là: {fruitValue.toLocaleString()} Xu
          </div>
        )}
      </div>
    </main>
  );
}
