
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Edit, MoreHorizontal } from "lucide-react";
import type { DocumentResponse } from "@/types/document.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import DocumentDetailsModal from "./Document-details-model";
import DocumentCreateModel from "./Document-create-model";
import { useState } from "react";

interface DocumentDataTableProps {
  documents: DocumentResponse[];
  isLoading?: boolean;
}

const DocumentDataTable = ({ documents, isLoading }: DocumentDataTableProps) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState<DocumentResponse | null>(null);

  const handleViewDocument = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocumentId(null);
  };

  const handleEditDocument = (document: DocumentResponse) => {
    setDocumentToEdit(document);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setDocumentToEdit(null);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string, paymentState: string) => {
    if (status === "completed" && paymentState === "paid") {
      return "bg-green-100 text-green-700 hover:bg-green-200";
    }
    if (status === "completed" && paymentState === "unpaid") {
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-200";
    }
    if (status === "draft") {
      return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
    return "bg-blue-100 text-blue-700 hover:bg-blue-200";
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case "invoice":
        return "bg-blue-100 text-blue-700";
      case "estimate":
        return "bg-purple-100 text-purple-700";
      case "purchase_order":
        return "bg-orange-100 text-orange-700";
      case "rental_proposal":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDocumentType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document No</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                  <TableCell>
                    <div className="h-8 bg-gray-200 rounded w-8 animate-pulse ml-auto"></div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">No documents yet</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-xs">
            Create your first invoice or estimate to begin tracking your business documents
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Document No</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Author</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {doc.documentNo}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`${getDocumentTypeColor(doc.documentType)} text-xs`}
                    >
                      {formatDocumentType(doc.documentType)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-75">
                    <div className="truncate" title={doc.documentTitle}>
                      {doc.documentTitle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="truncate max-w-50" title={doc.customerName || "No customer"}>
                      {doc.customerName || "No customer"}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(doc.mentionedDate)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${getStatusColor(doc.status, doc.transactionInfo.state)} text-xs`}
                    >
                      {doc.status === "draft" ? "Draft" : "Completed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="truncate max-w-37.5" title={doc.documentAuthor}>
                      {doc.documentAuthor}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="gap-2"
                          onClick={() => handleEditDocument(doc)}
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {/* Document Details Modal */}
      <DocumentDetailsModal 
        documentId={selectedDocumentId}
        open={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Edit Document Modal */}
      <DocumentCreateModel
        open={editModalOpen}
        onClose={handleCloseEditModal}
        documentToEdit={documentToEdit}
      />
    </Card>
  );
};

export default DocumentDataTable;