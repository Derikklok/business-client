
import { useDocument } from "@/hooks/useDocuments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  FileText, 
  Calendar, 
  Building2, 
  Edit3,
  CreditCard,
  FileCheck,
  Mail,
  Clock,
  User
} from "lucide-react";
import DocumentCreateModel from "./Document-create-model";
import { useState } from "react";

interface DocumentDetailsModalProps {
  documentId: string | null;
  open: boolean;
  onClose: () => void;
}

const DocumentDetailsModal = ({ documentId, open, onClose }: DocumentDetailsModalProps) => {
  const { data: document, isLoading, error } = useDocument(documentId || "");
  const [editModalOpen, setEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateOnly = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string, paymentState: string) => {
    if (status === "completed" && paymentState === "paid") {
      return "bg-green-100 text-green-700";
    }
    if (status === "completed" && paymentState === "unpaid") {
      return "bg-yellow-100 text-yellow-700";
    }
    if (status === "draft") {
      return "bg-gray-100 text-gray-700";
    }
    return "bg-blue-100 text-blue-700";
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
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Loading Document Details...</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !document) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Failed to load document details. Please try again.</p>
            <Button onClick={onClose} className="mt-4">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex! flex-col! max-w-6xl! w-[98vw]! sm:w-[95vw]! max-h-[98vh]! sm:max-h-[95vh]! overflow-y-auto! p-0! gap-0! rounded-lg!">
        {/* Header with Gradient Background */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 px-4 sm:px-8 py-4 sm:py-6 border-b border-primary/10 shrink-0 sticky top-0 z-10">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-primary/15 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {document.documentNo}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  View and manage document details
                </DialogDescription>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className={getStatusColor(document.status, document.transactionInfo.state)}>
                    {document.status === "draft" ? "Draft" : "Completed"}
                  </Badge>
                  <Badge className={getDocumentTypeColor(document.documentType)}>
                    {formatDocumentType(document.documentType)}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content Sections */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4 sm:space-y-6 px-4 sm:px-8 py-4 sm:py-6">
            
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-primary" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Document Title */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <FileText className="w-3 h-3" />
                    Document Title
                  </div>
                  <p className="font-semibold text-foreground">{document.documentTitle}</p>
                </div>

                {/* Document Author */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <User className="w-3 h-3" />
                    Document Author
                  </div>
                  <p className="font-semibold text-foreground">{document.documentAuthor}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Customer Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
                Customer Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Customer Name */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <Building2 className="w-3 h-3" />
                    Customer Name
                  </div>
                  <p className="font-semibold text-foreground">{document.customerName || "No customer assigned"}</p>
                </div>

                {/* Customer ID */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <Mail className="w-3 h-3" />
                    Customer ID
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">{document.customerId || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Date Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Date Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mentioned Date */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3" />
                    Mentioned Date
                  </div>
                  <p className="font-medium text-foreground">{formatDateOnly(document.mentionedDate)}</p>
                </div>

                {/* Created Date */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    Created Date
                  </div>
                  <p className="font-medium text-foreground">{formatDate(document.createdDate)}</p>
                </div>

                {/* Last Updated */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <Clock className="w-3 h-3" />
                    Last Updated
                  </div>
                  <p className="text-sm text-muted-foreground">{formatDate(document.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Payment & Status Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Payment & Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Document Status */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <FileCheck className="w-3 h-3" />
                    Document Status
                  </div>
                  <Badge className={getStatusColor(document.status, document.transactionInfo.state)}>
                    {document.status === "draft" ? "Draft" : "Completed"}
                  </Badge>
                </div>

                {/* Payment State */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <CreditCard className="w-3 h-3" />
                    Payment State
                  </div>
                  <Badge variant={document.transactionInfo.state === "paid" ? "default" : "secondary"}>
                    {document.transactionInfo.state}
                  </Badge>
                </div>

                {/* Paid Date (if exists) */}
                {document.transactionInfo.paidDate && (
                  <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors md:col-span-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                      <Calendar className="w-3 h-3" />
                      Paid Date
                    </div>
                    <p className="font-medium text-foreground">{formatDate(document.transactionInfo.paidDate)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Signature Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-primary" />
                Signature & Authorization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Created By */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <User className="w-3 h-3" />
                    Created By
                  </div>
                  <p className="font-medium text-foreground">{document.signature.createdBy}</p>
                </div>

                {/* Designation */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1">
                    <Edit3 className="w-3 h-3" />
                    Designation
                  </div>
                  <p className="font-medium text-foreground">{document.signature.designation}</p>
                </div>
              </div>
            </div>

            {/* Notes & Terms Section (if exists) */}
            {(document.specialNotes || document.termsAndConditions) && (
              <>
                {/* Divider */}
                <div className="h-px bg-border" />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Notes & Terms
                  </h3>
                  
                  <div className="space-y-4">
                    {document.specialNotes && (
                      <div className="p-4 bg-blue-50/50 border border-blue-200/50 rounded-lg">
                        <div className="flex items-center gap-2 text-xs font-medium text-blue-700 mb-2">
                          <FileText className="w-3 h-3" />
                          Special Notes
                        </div>
                        <p className="text-sm text-blue-800">{document.specialNotes}</p>
                      </div>
                    )}

                    {document.termsAndConditions && (
                      <div className="p-4 bg-orange-50/50 border border-orange-200/50 rounded-lg">
                        <div className="flex items-center gap-2 text-xs font-medium text-orange-700 mb-2">
                          <FileCheck className="w-3 h-3" />
                          Terms & Conditions
                        </div>
                        <p className="text-sm text-orange-800">{document.termsAndConditions}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons - Sticky Footer */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end px-4 sm:px-8 py-4 border-t border-border bg-muted/30 shrink-0 sticky bottom-0 z-10">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="min-w-24 w-full sm:w-auto"
          >
            Close
          </Button>
          <Button 
            className="gap-2 bg-primary hover:bg-primary/90 min-w-32 w-full sm:w-auto"
            onClick={() => setEditModalOpen(true)}
          >
            <Edit3 className="w-4 h-4" />
            Edit Document
          </Button>
        </div>

        {/* Edit Document Modal */}
        <DocumentCreateModel
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          documentToEdit={document}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailsModal;