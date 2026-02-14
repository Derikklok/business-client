import api from "@/lib/axios";
import type {
  CreateInventoryItemRequest,
  InventoryItem,
  UpdateInventoryItemRequest,
} from "@/types/inventory.types";

export const inventoryService = {
  // Get all items for a document
  getByDocumentId: async (documentId: string): Promise<InventoryItem[]> => {
    const res = await api.get<InventoryItem[]>(`/api/inventory/document/${documentId}`);
    return res.data;
  },

  // Get single item
  getById: async (id: string): Promise<InventoryItem> => {
    const res = await api.get<InventoryItem>(`/api/inventory/${id}`);
    return res.data;
  },

  // Create item
  create: async (data: CreateInventoryItemRequest): Promise<InventoryItem> => {
    const res = await api.post<InventoryItem>("/api/inventory", data);
    return res.data;
  },

  // Update item
  update: async (
    id: string,
    data: UpdateInventoryItemRequest
  ): Promise<InventoryItem> => {
    const res = await api.put<InventoryItem>(`/api/inventory/${id}`, data);
    return res.data;
  },

  // Delete item
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/api/inventory/${id}`);
    return res.data;
  },
};
