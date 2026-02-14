import { inventoryService } from "@/components/api/inventory.service";
import type {
  UpdateInventoryItemRequest,
} from "@/types/inventory.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Get all items for a document
export const useInventoryItems = (documentId: string) => {
  return useQuery({
    queryKey: ["inventory", documentId],
    queryFn: () => inventoryService.getByDocumentId(documentId),
    enabled: !!documentId,
  });
};

// Get single item
export const useInventoryItem = (id: string) => {
  return useQuery({
    queryKey: ["inventoryItem", id],
    queryFn: () => inventoryService.getById(id),
    enabled: !!id,
  });
};

// Create item
export const useCreateInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryService.create,

    onSuccess: (newItem) => {
      // Invalidate the document's inventory list
      queryClient.invalidateQueries({
        queryKey: ["inventory", newItem.documentId],
      });
    },
  });
};

// Update item
export const useUpdateInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateInventoryItemRequest;
    }) => inventoryService.update(id, data),

    onSuccess: (updated) => {
      // Invalidate the document's inventory list
      queryClient.invalidateQueries({
        queryKey: ["inventory", updated.documentId],
      });

      // Update single item cache
      queryClient.setQueryData(["inventoryItem", updated.id], updated);
    },
  });
};

// Delete item
export const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoryService.delete(id),

    onSuccess: () => {
      // Invalidate all inventory queries to refresh the list
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });
};
