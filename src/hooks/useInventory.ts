import { inventoryService } from "@/components/api/inventory.service";
import type {
  UpdateInventoryRequest,
} from "@/types/inventory.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get inventory for a document
export const useInventory = (documentId: string) => {
  return useQuery({
    queryKey: ["inventory", documentId],
    queryFn: () => inventoryService.getByDocumentId(documentId),
    enabled: !!documentId,
  });
};

// Create inventory for a document
export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryService.create,

    onSuccess: (newInventory) => {
      // Invalidate the document's inventory
      queryClient.invalidateQueries({
        queryKey: ["inventory", newInventory.documentId],
      });
    },
  });
};

// Update inventory
export const useUpdateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInventoryRequest;
    }) => inventoryService.update(id, data),

    onSuccess: (updated) => {
      // Invalidate the document's inventory
      queryClient.invalidateQueries({
        queryKey: ["inventory", updated.documentId],
      });

      // Update cache
      queryClient.setQueryData(["inventory", updated.documentId], updated);
    },
  });
};

// Delete inventory
export const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoryService.delete(id),

    onSuccess: () => {
      // Invalidate all inventory queries to refresh
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });
};
