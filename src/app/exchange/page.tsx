"use client";
import React, { useState } from "react";
import Header from "../_component/SubHeader";
import OrderCard from "../_component/Order";

export default function ExchangePage() {
  const fruit = {
    name: "Apple",
    imgs: "icon_hand_farm_crop_both_2025demonhunter_ginseng",
  };
  const variant = "Golden Apple";
  const ingame = "Player123";
  const createAt = "2024-06-15 14:30";

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-white px-6 py-4 overflow-auto">
        <OrderCard
          fruit={fruit}
          variant={variant}
          ingame={ingame}
          createAt={createAt}
        />
      </main>
    </div>
  );
}
