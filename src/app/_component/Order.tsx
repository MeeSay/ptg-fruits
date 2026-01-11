"use client";

import Image from "next/image";
import { useState } from "react";

interface OrderCardProps {
  fruit: {
    imgs: string;
    name: string;
  };
  variant: string;
  ingame: string;
  createAt: string;
}

export default function OrderCard({
  fruit,
  variant,
  ingame,
  createAt,
}: OrderCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ingame);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs">
      {/* Fruit Image */}
      <div className="relative w-full h-48">
        <Image
          src={`/images/fruits_icon/${fruit.imgs}.png`}
          alt={fruit.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-2">
        {/* Fruit Name */}
        <h3 className="text-xl font-bold text-gray-800">{fruit.name}</h3>

        {/* Variant */}
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Variant:</span> {variant}
        </p>

        {/* Ingame with Copy Button */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600 flex-1">
            <span className="font-semibold">Ingame:</span> {ingame}
          </p>
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
            title="Copy ingame"
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>

        {/* Create Date */}
        <p className="text-xs text-gray-400 pt-2 border-t border-gray-200">
          {new Date(createAt).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
