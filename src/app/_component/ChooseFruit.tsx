// filepath: g:\Workspace\Đồ án\ptgfruit\src\app\_component\ChooseFruit.tsx
import React, { useState } from "react";

const variants = [
  { label: "Ánh vàng", color: "text-yellow-500" },
  { label: "Cát", color: "text-yellow-700" },
  { label: "Đèn trời", color: "text-orange-400" },
  { label: "Cầu vồng", color: "text-pink-500" },
  { label: "Ánh trắng", color: "text-purple-400" },
  { label: "Ảo ảnh", color: "text-purple-300" },
  { label: "Ẩm ướt", color: "text-blue-400" },
  { label: "Cực quang", color: "text-pink-300" },
  { label: "Pháo hoa", color: "text-pink-400" },
  { label: "Nhiễm điện", color: "text-yellow-400" },
  { label: "Sương", color: "text-green-500" },
  { label: "Băng", color: "text-cyan-300" },
  { label: "Gió", color: "text-blue-500" },
  { label: "Khô", color: "text-orange-500" },
  { label: "Khí lạnh", color: "text-blue-300" },
  { label: "Nguyên rùa", color: "text-purple-400" },
];

const fruits = [
  { name: "Cây dâu", count: 26, icon: "🌱" },
  { name: "Xoài", count: 24, icon: "🥭" },
  { name: "Táo đường", count: 22, icon: "🍎" },
  { name: "Sầu riêng", count: 19, icon: "🌟" },
  { name: "Xương rồng", count: 18, icon: "🌵" },
  { name: "Dừa", count: 16, icon: "🥥" },
  { name: "Khế", count: 15, icon: "⭐" },
  { name: "Dâu tây", count: 13, icon: "🍓" },
  { name: "Nho", count: 13, icon: "🍇" },
  { name: "Táo", count: 11, icon: "🍎" },
  { name: "Cà chua", count: 10, icon: "🍅" },
  { name: "Chanh", count: 10, icon: "🍋" },
  { name: "Rau xà lách", count: 9, icon: "🥬" },
  { name: "Bắp", count: 6, icon: "🌽" },
  { name: "Bí ngô", count: 5, icon: "🎃" },
  { name: "Rau chân vịt", count: 5, icon: "🥬" },
  { name: "Việt quất", count: 5, icon: "🫐" },
  { name: "Dưa hấu", count: 4, icon: "🍉" },
  { name: "Cà rốt", count: 2, icon: "🥕" },
  { name: "Nhân sâm", count: 2, icon: "🌿" },
  { name: "Nấm", count: 1, icon: "🍄" },
  { name: "Dưa hấu ác linh", count: 1, icon: "🍉" },
  { name: "Bầu yêu quái", count: 1, icon: "💧" },
  { name: "Cây tùng", count: 1, icon: "🌲" },
  { name: "Kiwi", count: 1, icon: "🥝" },
  { name: "Bánh bao hấp", count: 1, icon: "🥟" },
  { name: "Bánh cá", count: 1, icon: "🐟" },
  { name: "Quýt", count: 1, icon: "🍊" },
  { name: "Hoa hướng dương xương", count: 0, icon: "🌻", disabled: true },
  { name: "Hoa hướng dương rắng", count: 0, icon: "🌻", disabled: true },
];

export interface Fruit {
  name: string;
  icon: string;
}

interface ChooseFruitProps {
  onClose: () => void;
  onSubmit: (data: { fruit: Fruit; variants: string[] }) => void;
}

export default function ChooseFruit({ onClose, onSubmit }: ChooseFruitProps) {
  const [activeTab, setActiveTab] = useState<"variant" | "fruit">("fruit");
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);

  const toggleVariant = (label: string) => {
    setSelectedVariants((prev) => {
      if (prev.includes(label)) {
        return prev.filter((v) => v !== label);
      } else {
        // Tối đa 5 biến thể
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, label];
      }
    });
  };

  const toggleFruit = (name: string, icon: string) => {
    setSelectedFruit((prev) =>
      prev && prev.name === name ? null : { name, icon }
    );
  };

  const clearAll = () => {
    setSelectedVariants([]);
    setSelectedFruit(null);
  };

  const handleSubmit = () => {
    if (!selectedFruit) {
      alert("Vui lòng chọn ít nhất một nông sản.");
      return;
    }
    onSubmit({
      fruit: selectedFruit,
      variants: selectedVariants,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#E5D3B3] rounded-3xl shadow-lg w-250 max-w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-4xl text-[#9B8070] hover:text-[#7C5C3E] font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#7C5C3E]">Lọc nông sản</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-[#BCA18A] mb-6">
          <button
            onClick={() => setActiveTab("fruit")}
            className={`px-6 py-3 font-bold text-lg ${
              activeTab === "fruit"
                ? "text-[#7C5C3E] border-b-4 border-[#8B6F47]"
                : "text-[#9B8070]"
            }`}
          >
            Nông sản
          </button>
          <button
            onClick={() => setActiveTab("variant")}
            className={`px-6 py-3 font-bold text-lg ${
              activeTab === "variant"
                ? "text-[#7C5C3E] border-b-4 border-[#8B6F47]"
                : "text-[#9B8070]"
            }`}
          >
            Biến thể
          </button>
        </div>

        {/* Content */}
        {activeTab === "variant" ? (
          <div className="grid grid-cols-6 gap-3 mb-6">
            {variants.map((v) => (
              <label
                key={v.label}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white shadow cursor-pointer transition ${
                  selectedVariants.includes(v.label)
                    ? "ring-2 ring-[#8B6F47]"
                    : ""
                }`}
              >
                <span className={`font-semibold text-sm ${v.color}`}>
                  {v.label}
                </span>
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(v.label)}
                  onChange={() => toggleVariant(v.label)}
                  className="accent-[#BCA18A] w-4 h-4"
                />
              </label>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3 mb-6">
            {fruits.map((fruit) => (
              <label
                key={fruit.name}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white shadow cursor-pointer transition ${
                  fruit.disabled ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  selectedFruit?.name === fruit.name
                    ? "ring-2 ring-[#8B6F47]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{fruit.icon}</span>
                  <span className="font-semibold text-sm text-[#7C5C3E]">
                    {fruit.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#9B8070]">{fruit.count}</span>
                  <input
                    type="checkbox"
                    checked={selectedFruit?.name === fruit.name}
                    onChange={() =>
                      !fruit.disabled && toggleFruit(fruit.name, fruit.icon)
                    }
                    disabled={fruit.disabled}
                    className="accent-[#BCA18A] w-4 h-4"
                  />
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-[#F5C246] text-white font-bold px-8 py-3 rounded-3xl text-lg shadow-md hover:bg-[#E5B236] transition"
            onClick={clearAll}
          >
            Bỏ chọn tất cả
          </button>
          <button
            className="bg-[#4EC9E8] text-white font-bold px-8 py-3 rounded-3xl text-lg shadow-md hover:bg-[#3EB9D8] transition"
            onClick={handleSubmit}
          >
            Cài đặt bộ lọc
          </button>
        </div>
      </div>
    </div>
  );
}
