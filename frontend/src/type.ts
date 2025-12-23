export interface Purchase {
    userId: string;
    productId: string;
    quantity: number;
  }
  
  export interface PurchaseResponse {
    purchases: Purchase[];
  }