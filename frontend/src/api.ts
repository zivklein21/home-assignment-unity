/**
 * API base URL configuration
 *
 * The base URL is injected via an environment variable at build time.
 * This allows the frontend to work in different environments
 * (local development, Kubernetes, CI/CD) without code changes.
 *
 * Default value "/api" assumes that the Web Server acts as
 * a reverse proxy for API requests.
 */
const API_BASE_URL = process.env.VITE_API_BASE_URL || "/api";

/**
 * Creates a new purchase.
 *
 * This function sends an HTTP request from the frontend
 * to the Web Server. The Web Server then publishes the
 * purchase event to Kafka for asynchronous processing.
 *
 * The frontend does not interact directly with the database
 * or Kafka, preserving clear separation of responsibilities.
 */
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

/**
 * Retrieves all purchases for a specific user.
 *
 * This function sends a request to the Web Server,
 * which in turn fetches the data from the Customer API.
 *
 * The frontend remains unaware of internal services
 * and relies only on the public Web Server interface.
 */
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