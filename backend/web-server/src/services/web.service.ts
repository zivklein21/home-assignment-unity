/**
 * Fetches purchase history for a specific user from the Customer API.
 *
 * This function is used by the Web Server service as an HTTP client.
 * The Web Server does not access the database directly and instead
 * delegates data ownership and retrieval to the Customer API.
 */
export async function fetchUserPurchases(baseUrl: string, userId: string) {
  const url = `${baseUrl}/purchases/${userId}`;

  const r = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await r.text();

  return {
    status: r.status,
    contentType: r.headers.get("content-type") || "application/json",
    bodyText: text,
  };
}