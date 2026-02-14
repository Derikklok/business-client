export interface InventoryItem {
  id: string;
  documentId: string;
  itemName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  itemType: "product" | "service";
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryItemRequest {
  documentId: string;
  itemName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  itemType: "product" | "service";
}

export interface UpdateInventoryItemRequest {
  itemName?: string;
  description?: string;
  quantity?: number;
  unitPrice?: number;
  itemType?: "product" | "service";
}
