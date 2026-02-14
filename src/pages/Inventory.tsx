
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDocument } from "@/hooks/useDocuments";
import { useInventoryItems } from "@/hooks/useInventory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Plus, FileText } from "lucide-react";
import { useState } from "react";
import InventoryDataTable from "@/components/inventory/Inventory-data-table";
import CreateInventoryItemModal from "@/components/inventory/Create-inventory-item-modal";

const Inventory = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const documentId = searchParams.get("documentId");
  
  const { data: document, isLoading: isLoadingDoc, error: docError } = useDocument(documentId || "");
  const { data: inventoryItems = [], isLoading: isLoadingItems } = useInventoryItems(documentId || "");
  
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDocumentType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
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

  const calculateTotal = () => {
    return inventoryItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  if (!documentId) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No document selected</p>
            <Button 
              onClick={() => navigate("/dashboard/documents")} 
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoadingDoc) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (docError || !document) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Document not found</p>
            <Button 
              onClick={() => navigate("/dashboard/documents")} 
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-3">
        <Button 
          onClick={() => navigate("/dashboard/documents")} 
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Document Details Card */}
      <Card className="border-primary/20 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Document Inventory
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Manage items and services for this document
                  </p>
                </div>
              </div>
            </div>
            <Button 
              className="gap-2"
              onClick={() => setCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          {/* Document Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Document No.</p>
              <p className="text-sm font-semibold text-foreground">{document.documentNo}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Type</p>
              <Badge 
                variant="secondary" 
                className={`${getDocumentTypeColor(document.documentType)} text-xs`}
              >
                {formatDocumentType(document.documentType)}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Customer</p>
              <p className="text-sm font-semibold text-foreground truncate" title={document.customerName}>
                {document.customerName}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Date</p>
              <p className="text-sm font-semibold text-foreground">{formatDate(document.mentionedDate)}</p>
            </div>
            <div className="space-y-1 md:col-span-2">
              <p className="text-xs text-muted-foreground font-medium">Title</p>
              <p className="text-sm font-semibold text-foreground">{document.documentTitle}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Status</p>
              <Badge variant="secondary" className="text-xs">
                {document.status === "draft" ? "Draft" : "Completed"}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Total Amount</p>
              <p className="text-sm font-bold text-primary">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Items Table */}
      <InventoryDataTable 
        items={inventoryItems} 
        isLoading={isLoadingItems}
        documentId={documentId}
      />

      {/* Create Item Modal */}
      <CreateInventoryItemModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        documentId={documentId}
      />
    </div>
  );
};

export default Inventory;