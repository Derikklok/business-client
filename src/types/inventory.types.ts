export interface InventoryItem {
  id: string;
  description: string;
  unitPrice: number; // Supports floating-point (e.g., 5000.50)
  quantity: number;  // Supports floating-point (e.g., 2.5)
  unitType: "unit" | "weight" | "volume";
  value: number;     // Calculated, supports floating-point
  notes?: string;
}

export interface InventoryResponse {
  id: string;
  documentId: string;
  items: InventoryItem[];
  subtotal: number;
  discount: number;
  tax: number;
  finalTotal: number;
  currency: string;
  paymentOption?: string;
  paymentInfo?: string;
  status: "draft" | "finalized";
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryRequest {
  documentId: string;
  items: {
    description: string;
    unitPrice: number;
    quantity: number;
    unitType: "unit" | "weight" | "volume";
    notes?: string;
  }[];
  discount?: number;
  tax?: number;
  currency?: string;
  paymentOption?: string;
  paymentInfo?: string;
}

export interface UpdateInventoryRequest {
  items?: {
    description: string;
    unitPrice: number;
    quantity: number;
    unitType: "unit" | "weight" | "volume";
    notes?: string;
  }[];
  discount?: number;
  tax?: number;
  paymentOption?: string;
  paymentInfo?: string;
  status?: "draft" | "finalized";
}
