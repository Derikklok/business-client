
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Customer } from "@/types/customer.types";
import { Mail, Phone, MapPin, FileText, Calendar, User, Badge, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CustomerDetailsModelProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailsModel = ({ customer, open, onOpenChange }: CustomerDetailsModelProps) => {
  if (!customer) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        {/* Header Section */}
        <DialogHeader className="pb-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-3xl font-bold text-foreground mb-2">
                {customer.companyName}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-md inline-flex items-center gap-2 text-sm font-semibold">
                  <Badge className="w-4 h-4" />
                  {customer.registrationNumber}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Content Sections - Horizontal Layout */}
        <div className="space-y-4 py-4">
          {/* Contact Information - Horizontal Grid */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Contact Information
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Contact Person */}
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-2">Contact Person</p>
                <p className="text-foreground font-semibold">{customer.contactPerson}</p>
              </div>

              {/* Email */}
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  Email Address
                </p>
                <p className="text-foreground font-semibold text-sm break-all hover:text-primary transition-colors cursor-pointer">
                  {customer.email}
                </p>
              </div>

              {/* Phone */}
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground font-medium mb-2 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Phone Number
                </p>
                <p className="text-foreground font-semibold">{customer.phone}</p>
              </div>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Location and Metadata - Horizontal Layout */}
          <div className="grid grid-cols-3 gap-4">
            {/* Location Section */}
            <div className="col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Location
              </h3>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                <p className="text-foreground text-sm">{customer.address}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Description
              </h3>
              <div className="p-3 bg-muted/30 rounded-lg border border-border/50 h-20 overflow-hidden">
                <p className="text-foreground text-sm leading-relaxed line-clamp-3">
                  {customer.description || "N/A"}
                </p>
              </div>
            </div>

            {/* Metadata Section */}
            <div className="col-span-1 space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" />
                Timeline
              </h3>
              <div className="space-y-2">
                <div className="p-2 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground font-medium">Created</p>
                  <p className="text-foreground font-semibold text-sm">{formatDate(customer.createdAt)}</p>
                </div>
                <div className="p-2 bg-muted/30 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground font-medium">Updated</p>
                  <p className="text-foreground font-semibold text-sm">{formatDate(customer.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-border pt-4 mt-4 flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Edit2 className="w-4 h-4" />
            Edit Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailsModel;