import { documentService } from "@/components/api/document.service";
import type { UpdateDocumentRequest } from "@/types/document.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: documentService.getAll,
  });
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => documentService.getById(id),
    enabled: !!id,
  });
};

/* CREATE */
export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentService.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });
    },
  });
};

/* UPDATE */
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateDocumentRequest;
    }) => documentService.update(id, data),

    onSuccess: (updated) => {
      queryClient.invalidateQueries({
        queryKey: ["documents"],
      });

      queryClient.setQueryData(
        ["document", updated.id],
        updated
      );
    },
  });
};