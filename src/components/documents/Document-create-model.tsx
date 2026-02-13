import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useCreateDocument, useUpdateDocument } from "@/hooks/useDocuments";
import { useCustomers } from "@/hooks/useCustomers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type {
  DocumentType,
  DocumentStatus,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  DocumentResponse,
} from "@/types/document.types";

interface DocumentCreateModelProps {
  open: boolean;
  onClose: () => void;
  documentType?: DocumentType;
  documentToEdit?: DocumentResponse | null;
}

const DocumentCreateModel = ({
  open,
  onClose,
  documentType: initialDocType = "invoice",
  documentToEdit,
}: DocumentCreateModelProps) => {
  const createMutation = useCreateDocument();
  const updateMutation = useUpdateDocument();
  const { data: customers = [] } = useCustomers();
  const isEditing = !!documentToEdit;

  const [formData, setFormData] = useState<CreateDocumentRequest>({
    customerId: "",
    documentType: initialDocType,
    mentionedDate: new Date().toISOString().split("T")[0],
    documentTitle: "",
    specialNotes: "",
    termsAndConditions: "",
    signature: {
      createdBy: "",
      designation: "",
    },
    status: "draft",
    transactionInfo: {
      state: "unpaid",
    },
    documentAuthor: "",
  });

  useLayoutEffect(() => {
    if (open) {
      if (documentToEdit) {
        // Set form data for editing - this pattern is valid for form initialization
        const newFormData = {
          customerId: documentToEdit.customerId,
          documentType: documentToEdit.documentType,
          mentionedDate: documentToEdit.mentionedDate.split("T")[0],
          documentTitle: documentToEdit.documentTitle,
          specialNotes: documentToEdit.specialNotes || "",
          termsAndConditions: documentToEdit.termsAndConditions || "",
          signature: documentToEdit.signature,
          status: documentToEdit.status,
          transactionInfo: documentToEdit.transactionInfo,
          documentAuthor: documentToEdit.documentAuthor,
        };
        flushSync(() => {
          setFormData(newFormData);
        });
      } else {
        flushSync(() => {
          setFormData((prev) => ({
            ...prev,
            documentType: initialDocType,
          }));
        });
      }
    }
  }, [documentToEdit, initialDocType, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getCustomerDisplay = (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? `${customer.companyName} (${customer.id})` : customerId;
  };

  const handleSignatureChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      signature: {
        ...prev.signature,
        [field]: value,
      },
    }));
  };

  const handleTransactionChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      transactionInfo: {
        ...prev.transactionInfo,
        [field as keyof typeof prev.transactionInfo]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!isEditing && !formData.customerId.trim()) {
      toast.error("Customer ID is required");
      return;
    }
    if (!formData.documentTitle.trim()) {
      toast.error("Document title is required");
      return;
    }
    if (!formData.documentAuthor.trim()) {
      toast.error("Document author is required");
      return;
    }
    if (!formData.signature.createdBy.trim()) {
      toast.error("Signature creator is required");
      return;
    }
    if (!formData.signature.designation.trim()) {
      toast.error("Designation is required");
      return;
    }

    try {
      if (isEditing && documentToEdit) {
        const updateData: UpdateDocumentRequest = {
          documentTitle: formData.documentTitle,
          specialNotes: formData.specialNotes,
          termsAndConditions: formData.termsAndConditions,
          signature: formData.signature,
          status: formData.status,
          transactionInfo: formData.transactionInfo,
        };
        await updateMutation.mutateAsync({
          id: documentToEdit.id,
          data: updateData,
        });
        toast.success("Document updated successfully");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Document created successfully");
      }
      onClose();
    } catch {
      toast.error(
        isEditing ? "Failed to update document" : "Failed to create document"
      );
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex! flex-col! max-w-3xl! w-[95vw]! max-h-[95vh]! overflow-y-auto! p-0! gap-0! rounded-lg!">
        {/* Header */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 px-8 py-6 border-b border-primary/10 shrink-0 sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isEditing ? "Edit Document" : "Create New Document"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the document details below"
                : "Fill in the document information below"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-8 py-6">
            {/* Document Type & Title */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Document Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Type */}
                {!isEditing && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(value) =>
                        handleInputChange("documentType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="invoice">Invoice</SelectItem>
                        <SelectItem value="estimate">Estimate</SelectItem>
                        <SelectItem value="purchase_order">
                          Purchase Order
                        </SelectItem>
                        <SelectItem value="rental_proposal">
                          Rental Proposal
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Document Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Document Title *
                  </label>
                  <Input
                    placeholder="Enter document title"
                    value={formData.documentTitle}
                    onChange={(e) =>
                      handleInputChange("documentTitle", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Customer Information
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Customer {!isEditing && <span className="text-red-500">*</span>}
                </label>
                {isEditing ? (
                  <div className="p-3 bg-muted/50 rounded-lg border border-border text-sm text-muted-foreground">
                    {getCustomerDisplay(formData.customerId)}
                    <p className="text-xs mt-2">Customer cannot be changed for existing documents</p>
                  </div>
                ) : (
                  <Select
                    value={formData.customerId}
                    onValueChange={(value) => handleInputChange("customerId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer..." />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.length > 0 ? (
                        customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{customer.companyName}</span>
                              <span className="text-xs text-muted-foreground">({customer.id})</span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-4 text-sm text-muted-foreground text-center">
                          No customers available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Date Information
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mentioned Date</label>
                <Input
                  type="date"
                  value={formData.mentionedDate}
                  onChange={(e) =>
                    handleInputChange("mentionedDate", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Signature */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Authorization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Created By *
                  </label>
                  <Input
                    placeholder="Full name"
                    value={formData.signature.createdBy}
                    onChange={(e) =>
                      handleSignatureChange("createdBy", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Designation *
                  </label>
                  <Input
                    placeholder="e.g., Manager, Director"
                    value={formData.signature.designation}
                    onChange={(e) =>
                      handleSignatureChange("designation", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Document Author */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Author Information
              </h3>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Document Author *
                </label>
                <Input
                  placeholder="Enter document author name"
                  value={formData.documentAuthor}
                  onChange={(e) =>
                    handleInputChange("documentAuthor", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Status & Payment */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Status & Payment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Document Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value as DocumentStatus)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment State</label>
                  <Select
                    value={formData.transactionInfo.state}
                    onValueChange={(value) =>
                      handleTransactionChange("state", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Notes & Terms */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Additional Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Notes</label>
                  <Textarea
                    placeholder="Add any special notes..."
                    value={formData.specialNotes}
                    onChange={(e) =>
                      handleInputChange("specialNotes", e.target.value)
                    }
                    className="resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Terms & Conditions
                  </label>
                  <Textarea
                    placeholder="Add terms and conditions..."
                    value={formData.termsAndConditions}
                    onChange={(e) =>
                      handleInputChange("termsAndConditions", e.target.value)
                    }
                    className="resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end px-8 py-4 border-t border-border bg-muted/30 shrink-0 sticky bottom-0 z-10">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary hover:bg-primary/90"
          >
            {isLoading
              ? "Saving..."
              : isEditing
                ? "Update Document"
                : "Create Document"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentCreateModel;
