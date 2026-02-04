import { customerService } from "@/components/api/customer.service";
import { useQuery } from "@tanstack/react-query";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customerService.getAll,
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => customerService.getById(id),
    enabled: !!id, // only run if id exists
  });
};