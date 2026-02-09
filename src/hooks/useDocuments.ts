import { documentService } from "@/components/api/document.service";
import { useQuery } from "@tanstack/react-query";

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
