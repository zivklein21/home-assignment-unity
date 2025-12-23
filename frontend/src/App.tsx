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
      <h1 className="title">Ziv - Unity</h1>

      <div className="form-row">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="number"
          placeholder="User Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn" onClick={handleBuy}>Buy</button>
      </div>

      <div className="form-row">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="btn" onClick={handleGetPurchases}>Get Purchases</button>
      </div>

      {result.length > 0 && (
        <div className="results">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Price</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {result.map((purchase, index) => (
                <tr key={index}>
                  <td>{purchase.userid}</td>
                  <td>{purchase.username}</td>
                  <td>{purchase.price}</td>
                  <td>{new Date(purchase.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;