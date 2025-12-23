// Use VITE_ prefix if you're using Vite (recommended)
const API_BASE_URL = '/api';

console.log("API_BASE_URL:", API_BASE_URL);

export async function createPurchase(userId: string, userName: string, price: number) {
  const response = await fetch(`${API_BASE_URL}/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, userName, price }),
  });

  if (!response.ok) {
    throw new Error("Failed to create purchase");
  }

  return response.json();
}

export async function getPurchases(userId: string) {
  const response = await fetch(`${API_BASE_URL}/purchase/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch purchases");
  }

  return response.json();
}