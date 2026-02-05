import { customerService } from "@/components/api/customer.service";
import type {
  CreateCustomerRequest,
  UpdateCustomerRequest,
  Customer,
} from "@/types/customer.types";
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

/* UPDATE */
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerRequest }) =>
      customerService.update(id, data),

    onSuccess: (updated) => {
      // Refresh list
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });

      // Update details cache
      queryClient.setQueryData(["customer", updated.id], updated);
    },
  });
};

/* DELETE */
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customerService.delete(id),

    onSuccess: (_, id) => {
      // Remove from list cache
      queryClient.setQueryData(["customers"], (old: Customer[] | undefined) =>
        old?.filter((c: Customer) => c.id !== id),
      );
    },
  });
};
