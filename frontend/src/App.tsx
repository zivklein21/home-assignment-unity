import React, { useState } from "react";
import "./App.css";
import { createPurchase, getPurchases } from "./api";

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState<any[]>([]);

  const handleBuy = async () => {
    try {
      const numericPrice = parseFloat(price);
      await createPurchase(userId, userName, numericPrice);
      alert("Purchase sent!");
    } catch (error) {
      alert("Error sending purchase");
      console.error(error);
    }
  };

  const handleGetPurchases = async () => {
    try {
      const purchases = await getPurchases(userId);
      setResult(purchases);
    } catch (error) {
      alert("Error fetching purchases");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Ziv - Unity</h1>
      <div className="input-row">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Use Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleBuy}>BUY</button>
      </div>

      <div className="input-row">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleGetPurchases}>Get My Purchases</button>
      </div>

      {result.length > 0 && (
        <div className="results">
          <h2>My Purchases</h2>
          <ul>
            {result.map((purchase, index) => (
              <li key={index}>
                {purchase.userName} bought for {purchase.price}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;