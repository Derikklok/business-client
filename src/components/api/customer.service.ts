import api from "@/lib/axios";
import type {
  CreateCustomerRequest,
  Customer,
  UpdateCustomerRequest,
} from "@/types/customer.types";

export const customerService = {
  // Get All Customers
  getAll: async (): Promise<Customer[]> => {
    const res = await api.get<Customer[]>("/api/customers");
    return res.data;
  },
  // Get by ID
  getById: async (id: string): Promise<Customer> => {
    const res = await api.get<Customer>(`/api/customers/${id}`);
    return res.data;
  },
  // Create customer
  create: async (data: CreateCustomerRequest): Promise<Customer> => {
    const res = await api.post("/api/customers", data);
    return res.data;
  },
  // Update customer
  update: async (
    id: string,
    data: UpdateCustomerRequest,
  ): Promise<Customer> => {
    const res = await api.put<Customer>(`/api/customers/${id}`, data);
    return res.data;
  },
  // Delete customer
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await api.delete<{ message: string }>(`/api/customers/${id}`);
    return res.data;
  },
};
