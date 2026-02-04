import { customerService } from "@/components/api/customer.service";
import type { CreateCustomerRequest } from "@/types/customer.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// Create
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCustomerRequest) => customerService.create(data),

    onSuccess: () => {
      // Refresh customer list
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });
};
