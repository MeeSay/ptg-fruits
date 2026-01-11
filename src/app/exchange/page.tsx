"use client";
import React, { useState } from "react";
import Header from "../_component/SubHeader";
import OrderCard from "../_component/Order";
import Welcome from "../_component/Welcome";

export default function ExchangePage() {
  const [activeTab, setActiveTab] = useState<string>("search");

  const fruit = {
    name: "Apple",
    imgs: "icon_hand_farm_crop_both_2025demonhunter_ginseng",
  };
  const variant = "Golden Apple";
  const ingame = "Player123";
  const createAt = "2024-06-15 14:30";

  const handleGetOrder = (tab: string) => {
    setActiveTab(tab);
    // TODO: Implement logic to fetch orders based on tab
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex h-full w-full bg-white overflow-auto">
        <div className="flex h-full w-full gap-6">
          <Welcome />
          <div className="flex flex-col w-full">
            <div className="flex gap-4 w-full mt-6">
              <h2 className="text-2xl font-bold mb-4 text-black">Đơn Hàng</h2>
            </div>
            <div className="flex items-center justify-between mb-4 border-b-2 border-gray-300">
              <div className="flex items-center">
                <button
                  onClick={() => handleGetOrder("search")}
                  className={`text-black text-center font-bold p-2 transition-colors ${
                    activeTab === "search"
                      ? "bg-yellow-500"
                      : " hover:bg-gray-300"
                  }`}
                >
                  Tìm kiếm
                </button>
                <button
                  onClick={() => handleGetOrder("available")}
                  className={`text-black text-center font-bold p-2 transition-colors ${
                    activeTab === "available"
                      ? "bg-yellow-500"
                      : " hover:bg-gray-300"
                  }`}
                >
                  Có sẵn
                </button>
                <button
                  onClick={() => handleGetOrder("yours")}
                  className={`text-black text-center font-bold p-2 transition-colors ${
                    activeTab === "yours"
                      ? "bg-yellow-500"
                      : " hover:bg-gray-300"
                  }`}
                >
                  Đơn của bạn
                </button>
              </div>
              <button className="text-black text-center font-bold bg-yellow-500 hover:bg-yellow-600 p-2">
                Tạo yêu cầu mới
              </button>
            </div>
            <div>
              <OrderCard
                fruit={fruit}
                variant={variant}
                ingame={ingame}
                createAt={createAt}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
