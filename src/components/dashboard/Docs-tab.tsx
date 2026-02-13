
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, FileText, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentDataTable from "@/components/documents/Document-data-table";
import DocumentCreateModel from "@/components/documents/Document-create-model";
import { useState } from "react";
import type { DocumentResponse, DocumentType } from "@/types/document.types";

const Documentstab = () => {
  const { data: documents = [], isLoading, error } = useDocuments();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<DocumentType>("invoice");

  const docTypes = [
    { label: "All", value: "all" },
    { label: "Invoice", value: "invoice" },
    { label: "Estimate", value: "estimate" },
    { label: "Purchase Order", value: "purchase_order" },
    { label: "Rental Proposal", value: "rental_proposal" }
  ];

  // Filter documents based on search term and type
  const filteredDocuments = documents.filter((doc: DocumentResponse) => {
    const matchesSearch = doc.documentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.documentTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || doc.documentType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleCreateDocument = (docType: DocumentType) => {
    setSelectedDocType(docType);
    setCreateModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-linear-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Documents
              </h2>
              <p className="text-sm text-muted-foreground">Create and manage invoices, estimates, and quotes</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                More
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleCreateDocument("estimate")}>
                <Plus className="w-4 h-4 mr-2" />
                Estimate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateDocument("purchase_order")}>
                <Plus className="w-4 h-4 mr-2" />
                Purchase Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCreateDocument("rental_proposal")}>
                <Plus className="w-4 h-4 mr-2" />
                Rental Proposal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="gap-2" onClick={() => handleCreateDocument("invoice")}>
            <Plus className="w-4 h-4" />
            Invoice
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Document type" />
          </SelectTrigger>
          <SelectContent>
            {docTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Error State */}
      {error ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load documents. Please try again.</p>
        </div>
      ) : (
        /* Documents Data Table */
        <DocumentDataTable 
          documents={filteredDocuments} 
          isLoading={isLoading}
        />
      )}

      {/* Create Document Modal */}
      <DocumentCreateModel
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        documentType={selectedDocType}
      />
    </div>
  );
};

export default Documentstab;
