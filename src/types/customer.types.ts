export interface Customer {
  id: string;
  registrationNumber: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: number;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequest {
  companyName: string;
  address: string;
  contactPerson: string;
  phone: number;
  email: string;
  description: string;
}