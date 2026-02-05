import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Building2, User, Mail, Phone, MapPin, FileText } from "lucide-react";
import { useUpdateCustomer } from "@/hooks/useCustomers";
import type { Customer } from "@/types/customer.types";

interface EditCustomerModelProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditCustomerModel = ({ customer, open, onOpenChange }: EditCustomerModelProps) => {
  const updateCustomer = useUpdateCustomer();
  const isLoading = updateCustomer.isPending;

  // Compute initial form data from customer prop
  const initialFormData = useMemo(() => {
    if (!customer) {
      return {
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      };
    }
    return {
      companyName: customer.companyName,
      contactPerson: customer.contactPerson,
      email: customer.email,
      phone: customer.phone.toString(),
      address: customer.address,
      description: customer.description,
    };
  }, [customer]);

  const [formData, setFormData] = useState(initialFormData);

  // Sync form data when customer changes
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!customer) {
      toast.error("Customer data not found");
      return;
    }

    // Validation
    if (
      !formData.companyName ||
      !formData.contactPerson ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      // Call API to update customer
      await updateCustomer.mutateAsync({
        id: customer.id,
        data: {
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: parseInt(formData.phone.replace(/\D/g, ""), 10),
          address: formData.address,
          description: formData.description,
        },
      });

      toast.success("Customer updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update customer");
      console.error(error);
    }
  };

  if (!customer) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-150 overflow-y-auto flex flex-col p-0">
        {/* Header with Gradient Background */}
        <SheetHeader className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-6 border-b border-primary/10">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-primary/15 rounded-lg">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <SheetTitle className="text-2xl font-bold text-foreground">
                {customer.companyName}
              </SheetTitle>
              <SheetDescription className="mt-1 text-sm">
                Update customer details below
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto">
          <div className="space-y-6 px-6 py-6">
            {/* Business Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Business Information
              </h3>
              
              <div className="space-y-4">
                {/* Company Name - Full Width */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Company Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="e.g., ABC Corporation"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="h-10 focus:border-primary focus:ring-primary/20"
                  />
                </div>

                {/* Contact Person & Email - Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson" className="text-sm font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Contact Person <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      placeholder="e.g., John Doe"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="h-10 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g., john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-10 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Location & Contact Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Location & Contact
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="e.g., +1 234 567 8900"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-10 focus:border-primary focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="e.g., 123 Business Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="h-10 focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Additional Information Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Additional Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Add any additional notes or details about the customer..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="resize-none focus:border-primary focus:ring-primary/20"
                />
                <p className="text-xs text-muted-foreground">Optional field for additional notes</p>
              </div>
            </div>
          </div>

          {/* Action Buttons - Sticky Footer */}
          <div className="flex gap-3 justify-end px-6 py-4 border-t border-border mt-auto bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
              className="min-w-24"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-primary hover:bg-primary/90 min-w-32"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Updating..." : "Update Customer"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditCustomerModel;