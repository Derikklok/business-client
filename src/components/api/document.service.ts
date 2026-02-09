import api from "@/lib/axios";
import type { DocumentResponse } from "@/types/document.types";

export const documentService = {
  // Get All Documents
  getAll: async (): Promise<DocumentResponse[]> => {
    const res = await api.get<DocumentResponse[]>("/api/documents");
    return res.data;
  },
  /* Get by id */
  getById: async (id: string): Promise<DocumentResponse> => {
    const res = await api.get<DocumentResponse>(
      `/api/documents/${id}`
    );
    return res.data;
  },
};
