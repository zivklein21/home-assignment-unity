export async function fetchUserPurchases(baseUrl: string, userId: string) {
  const url = `${baseUrl}/purchases/${encodeURIComponent(userId)}`;

  const r = await fetch(url, { headers: { Accept: "application/json" } });
  const text = await r.text();

  return {
    status: r.status,
    contentType: r.headers.get("content-type") || "application/json",
    bodyText: text,
  };
}