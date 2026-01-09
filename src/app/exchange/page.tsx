"use client";
import React, { useState } from "react";
import Header from "../_component/SubHeader";

export default function ExchangePage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-white px-6 py-4 overflow-auto"></main>
    </div>
  );
}
