import api from "@/lib/axios";
import type {
  CreateInventoryRequest,
  InventoryResponse,
  UpdateInventoryRequest,
} from "@/types/inventory.types";

export const inventoryService = {
  // Get inventory for a document
  getByDocumentId: async (documentId: string): Promise<InventoryResponse> => {
    const res = await api.get<InventoryResponse>(`/api/inventory/document/${documentId}`);
    return res.data;
  },

  // Create inventory for a document
  create: async (data: CreateInventoryRequest): Promise<InventoryResponse> => {
    const res = await api.post<InventoryResponse>("/api/inventory", data);
    return res.data;
  },

  // Update inventory
  update: async (
    id: string,
    data: UpdateInventoryRequest
  ): Promise<InventoryResponse> => {
    const res = await api.put<InventoryResponse>(`/api/inventory/${id}`, data);
    return res.data;
  },

  // Delete inventory
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/api/inventory/${id}`);
    return res.data;
  },
};
