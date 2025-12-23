const API_BASE_URL = process.env.VITE_API_BASE_URL || "/api";

console.log("API_BASE_URL:", API_BASE_URL);

export async function createPurchase(
    userid: string,
    username: string,
    price: number
  ) {
    const response = await fetch(`${API_BASE_URL}/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid,
        username,
        price,
        timestamp: new Date().toISOString(),
      }),
    });
  
    if (!response.ok) {
      const text = await response.text();
      console.error("POST /buy failed:", text);
      throw new Error(`Failed to create purchase: ${text}`);
    }
  
    return response.json();
  }

export async function getPurchases(userid: string) {
    const response = await fetch(
      `${API_BASE_URL}/getAllUserBuys?userid=${encodeURIComponent(userid)}`
    );
  
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch purchases: ${text}`);
    }
  
    return response.json();
  }