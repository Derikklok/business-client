export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export type DocumentStatus = "paid" | "pending" | "overdue";
export type DocumentType = "invoice" | "estimate" | "quote";

export interface Document {
  _id: string;
  documentNumber: string;
  customerName: string;
  customerId: string;
  type: DocumentType;
  date: string;
  amount: number;
  status: DocumentStatus;
  createdAt?: string;
  updatedAt?: string;
}
