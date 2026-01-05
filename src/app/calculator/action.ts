"use server";

const API_GATEWAY_URL = process.env.API_GATEWAY_URL || "http://localhost:3001";

interface Variant {
  id: string;
  name: string;
  text_color: string;
  background_color: string;
  value: number;
}

interface Fruit {
  id: string;
  name: string;
  average: number;
  imgs: string;
}

/**
 * Fetch all variants from API Gateway
 */
export async function getVariants(): Promise<Variant[]> {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/api/variants`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for real-time data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch variants: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching variants:", error);
    throw error;
  }
}

/**
 * Search variants by query
 */
export async function searchVariants(query: string): Promise<Variant[]> {
  try {
    const response = await fetch(
      `${API_GATEWAY_URL}/api/variants/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to search variants: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching variants:", error);
    throw error;
  }
}

/**
 * Fetch all fruits from API Gateway
 */
export async function getFruits(): Promise<Fruit[]> {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/api/fruits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for real-time data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch fruits: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching fruits:", error);
    throw error;
  }
}

/**
 * Search fruits by query
 */
export async function searchFruits(query: string): Promise<Fruit[]> {
  try {
    const response = await fetch(
      `${API_GATEWAY_URL}/api/fruits/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to search fruits: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching fruits:", error);
    throw error;
  }
}
