import React, { useState } from "react";
import { Fruit, Variant } from "../calculator/action";
interface ChooseFruitProps {
  onClose: () => void;
  onSubmit: (data: { fruit: Fruit; variants: string[] }) => void;
  fruits: Fruit[];
  variants: Variant[];
}

export default function ChooseFruit({
  onClose,
  onSubmit,
  fruits,
  variants,
}: ChooseFruitProps) {
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

  const toggleFruit = (fruit: Fruit) => {
    setSelectedFruit((prev) => (prev && prev.id === fruit.id ? null : fruit));
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
                key={v.name}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white shadow cursor-pointer transition ${
                  selectedVariants.includes(v.name)
                    ? "ring-2 ring-[#8B6F47]"
                    : ""
                }`}
              >
                <span className={`font-semibold text-sm ${v.text_color}`}>
                  {v.name}
                </span>
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(v.name)}
                  onChange={() => toggleVariant(v.name)}
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
                  selectedFruit?.id === fruit.id ? "ring-2 ring-[#8B6F47]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* <span className="text-lg">{fruit.imgs}</span> */}
                  <span className="font-semibold text-sm text-[#7C5C3E]">
                    {fruit.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedFruit?.id === fruit.id}
                    onChange={() => toggleFruit(fruit)}
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
