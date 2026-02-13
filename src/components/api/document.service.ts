import api from "@/lib/axios";
import type {
  CreateDocumentRequest,
  DocumentResponse,
  UpdateDocumentRequest,
} from "@/types/document.types";

export const documentService = {
  // Get All Documents
  getAll: async (): Promise<DocumentResponse[]> => {
    const res = await api.get<DocumentResponse[]>("/api/documents");
    return res.data;
  },
  /* Get by id */
  getById: async (id: string): Promise<DocumentResponse> => {
    const res = await api.get<DocumentResponse>(`/api/documents/${id}`);
    return res.data;
  },
  /* Create */
  create: async (data: CreateDocumentRequest): Promise<DocumentResponse> => {
    const res = await api.post<DocumentResponse>("/api/documents", data);
    return res.data;
  },
  /* Update */
  update: async (
    id: string,
    data: UpdateDocumentRequest,
  ): Promise<DocumentResponse> => {
    const res = await api.put(`/api/documents/${id}`, data);
    return res.data;
  },
  /* DELETE */
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/api/documents/${id}`);

    return res.data;
  },
};
