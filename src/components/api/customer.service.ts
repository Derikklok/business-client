import api from "@/lib/axios";
import type { CreateCustomerRequest, Customer } from "@/types/customer.types";

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
};
