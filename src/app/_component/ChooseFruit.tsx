import React, { useState } from "react";
import { Fruit, Variant } from "../calculator/action";
import Image from "next/image";
interface ChooseFruitProps {
  onClose: () => void;
  onSubmit: (data: { fruit: Fruit; variants: Variant[] }) => void;
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
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);

  const toggleVariant = (variant: Variant) => {
    setSelectedVariants((prev) => {
      const isSelected = prev.some((v) => v.id === variant.id);
      if (isSelected) {
        return prev.filter((v) => v.id !== variant.id);
      } else {
        // Tối đa 5 biến thể
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, variant];
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-lg w-250 max-w-full py-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-4xl text-[#9B8070] hover:text-[#7C5C3E] font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#7C5C3E]">Chọn nông sản</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-[#BCA18A]">
          <button
            onClick={() => setActiveTab("fruit")}
            className={`px-6 py-3 font-bold text-lg flex ${
              activeTab === "fruit"
                ? "text-[#7C5C3E] border-b-4 border-[#8B6F47]"
                : "text-[#9B8070]"
            }`}
          >
            Nông sản
            {selectedFruit && (
              <span className="text-[12px] text-center text-white bg-blue-500 font-semibold rounded-full h-4 w-4 border border-blue-700">
                {" "}
                1{" "}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("variant")}
            className={`px-6 py-3 font-bold text-lg flex ${
              activeTab === "variant"
                ? "text-[#7C5C3E] border-b-4 border-[#8B6F47]"
                : "text-[#9B8070]"
            }`}
          >
            Biến thể
            {selectedVariants.length > 0 && (
              <span className="text-[12px] text-center text-white bg-blue-500 font-semibold rounded-full h-4 w-4 border border-blue-700">
                {" "}
                {selectedVariants.length}{" "}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === "variant" ? (
          <div className="grid grid-cols-6 bg-[#E5D3B3] gap-3 p-4 max-h-96 overflow-y-auto scrollbar-custom">
            {variants.map((variant) => (
              <label
                key={variant.name}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white shadow cursor-pointer transition ${
                  selectedVariants.some((sv) => sv.id === variant.id)
                    ? "ring-2 ring-[#8B6F47]"
                    : ""
                }`}
              >
                <span
                  className="font-semibold text-sm"
                  style={{ color: variant.text_color }}
                >
                  {variant.name}
                </span>
                <input
                  type="checkbox"
                  checked={selectedVariants.some((sv) => sv.id === variant.id)}
                  onChange={() => toggleVariant(variant)}
                  className="accent-[#BCA18A] w-4 h-4"
                />
              </label>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 bg-[#E5D3B3] gap-3 p-4 max-h-96 overflow-y-auto scrollbar-custom">
            {fruits.map((fruit) => (
              <label
                key={fruit.name}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-2xl bg-white shadow cursor-pointer transition ${
                  selectedFruit?.id === fruit.id ? "ring-2 ring-[#8B6F47]" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/fruits_icon/${fruit.imgs}.png`}
                    alt={fruit.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="font-semibold text-start text-sm text-[#7C5C3E]">
                    {fruit.name}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={selectedFruit?.id === fruit.id}
                  onChange={() => toggleFruit(fruit)}
                  className="accent-[#BCA18A] w-4 h-4"
                />
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
