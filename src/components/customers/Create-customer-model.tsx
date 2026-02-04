import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Loader2, Building2, User, Mail, Phone, MapPin, FileText } from "lucide-react";
import { useCreateCustomer } from "@/hooks/useCustomers";

interface CreateCustomerModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCustomerModel = ({ open, onOpenChange }: CreateCustomerModelProps) => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });
  const createCustomer = useCreateCustomer();
  const isLoading = createCustomer.isPending;

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

    // Phone validation (basic)
    if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      // Convert phone to number and call API
      await createCustomer.mutateAsync({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: parseInt(formData.phone.replace(/\D/g, ""), 10),
        address: formData.address,
        description: formData.description,
      });

      toast.success("Customer created successfully!");
      onOpenChange(false);
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      });
    } catch (error) {
      toast.error("Failed to create customer");
      console.error(error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-135 overflow-y-auto flex flex-col p-0">
        <SheetHeader className="bg-linear-to-br from-primary to-primary/70 text-primary-foreground pb-8 pt-8 px-6 rounded-b-lg">
          <SheetTitle className="text-2xl font-bold text-primary-foreground">Add New Customer</SheetTitle>
          <SheetDescription className="text-sm mt-2 text-primary-foreground/80">
            Fill in the details below to create a new customer record
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-2 px-6 flex-1">
          {/* Company Name - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Company Name *
            </Label>
            <Input
              id="companyName"
              name="companyName"
              placeholder="e.g., ABC Corporation"
              value={formData.companyName}
              onChange={handleInputChange}
              className="h-10"
            />
          </div>

          {/* Contact Person & Email - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contactPerson" className="font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Contact Person *
              </Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                placeholder="e.g., John Doe"
                value={formData.contactPerson}
                onChange={handleInputChange}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g., john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="h-10"
              />
            </div>
          </div>

          {/* Phone & Address - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="e.g., +1 234 567 8900"
                value={formData.phone}
                onChange={handleInputChange}
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Address *
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="e.g., 123 Business Street"
                value={formData.address}
                onChange={handleInputChange}
                className="h-10"
              />
            </div>
          </div>

          {/* Description - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="description" className="font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add any additional notes or details about the customer..."
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-8 mt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gap-2 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? "Creating..." : "Create Customer"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCustomerModel;
