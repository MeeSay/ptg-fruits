"use client";
import React, { useState } from "react";
import FruitDropdown, { Fruit } from "../_component/FruitDropdown";

export default function ExchangePage() {
  const [fruit, setFruit] = useState<Fruit>({
    name: "",
    price: 0,
  });
  const [fruitWeight, setFruitWeight] = useState<number>(0);
  const [fruitValue, setFruitValue] = useState<number>(0);
  const handleCaculator = () => {
    const totalPrice = fruit.price * fruitWeight;
    setFruitValue(totalPrice);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-green-50 p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Yêu cầu trao đổi
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Chọn loại trái cây cần tính và biến thể:
        </p>
        <div className="flex flex-col gap-6 items-center">
          <FruitDropdown onSelect={setFruit} />
          <p className="text-green-700 text-lg">Nhập cân nặng</p>
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
        {fruitValue != 0 && (
          <div className="mt-6 text-xl text-green-800 font-semibold">
            Giá trị trái cây của bạn là: {fruitValue.toLocaleString()} Xu
          </div>
        )}
      </div>
    </main>
  );
}
