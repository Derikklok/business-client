
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Customer } from "@/types/customer.types";
import { Mail, Phone, MapPin, FileText, Calendar, User, Badge, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditCustomerModel from "./Edit-Customer-model";

interface CustomerDetailsModelProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailsModel = ({ customer, open, onOpenChange }: CustomerDetailsModelProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  if (!customer) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex! flex-col! max-w-6xl! w-[95vw]! max-h-[95vh]! overflow-y-auto! p-0! gap-0! rounded-lg!">
          {/* Header with Gradient Background */}
          <div className="bg-linear-to-r from-primary/10 to-primary/5 px-8 py-6 border-b border-primary/10 shrink-0 sticky top-0 z-10">
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary/15 rounded-lg">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-3xl font-bold text-foreground mb-2">
                    {customer.companyName}
                  </DialogTitle>
                  <DialogDescription className="text-sm">
                    View and manage customer details
                  </DialogDescription>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg inline-flex items-center gap-2 text-sm font-semibold border border-primary/20">
                      <Badge className="w-3.5 h-3.5" />
                      {customer.registrationNumber}
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Content Sections */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 px-8 py-6">
            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-4">
                {/* Contact Person */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2">Contact Person</p>
                  <p className="text-foreground font-semibold">{customer.contactPerson}</p>
                </div>

                {/* Email */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    Email Address
                  </p>
                  <p className="text-foreground font-semibold text-sm break-all hover:text-primary transition-colors cursor-pointer">
                    {customer.email}
                  </p>
                </div>

                {/* Phone */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Phone Number
                  </p>
                  <p className="text-foreground font-semibold">{customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Location & Description Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Location & Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2">Address</p>
                  <p className="text-foreground text-sm leading-relaxed">{customer.address}</p>
                </div>

                {/* Description */}
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    Description
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {customer.description || "No additional notes"}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Timeline Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2">Created Date</p>
                  <p className="text-foreground font-semibold">{formatDate(customer.createdAt)}</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <p className="text-xs text-muted-foreground font-medium mb-2">Last Updated</p>
                  <p className="text-foreground font-semibold">{formatDate(customer.updatedAt)}</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Action Buttons - Sticky Footer */}
          <div className="flex gap-3 justify-end px-8 py-4 border-t border-border bg-muted/30 shrink-0 sticky bottom-0 z-10">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="min-w-24"
            >
              Close
            </Button>
            <Button 
              className="gap-2 bg-primary hover:bg-primary/90 min-w-32"
              onClick={handleEditClick}
            >
              <Edit2 className="w-4 h-4" />
              Edit Customer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Customer Modal */}
      <EditCustomerModel
        customer={customer}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />
    </>
  );
};

export default CustomerDetailsModel;