import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import type { InventoryItem } from "@/types/inventory.types";
import { useCreateInventoryItem, useUpdateInventoryItem } from "@/hooks/useInventory";

interface CreateInventoryItemModalProps {
  open: boolean;
  onClose: () => void;
  documentId: string;
  itemToEdit?: InventoryItem | null;
}

const CreateInventoryItemModal = ({
  open,
  onClose,
  documentId,
  itemToEdit,
}: CreateInventoryItemModalProps) => {
  const createMutation = useCreateInventoryItem();
  const updateMutation = useUpdateInventoryItem();
  const isEditing = !!itemToEdit;

  // Initialize form data based on itemToEdit or defaults
  const getInitialFormData = () => {
    if (itemToEdit) {
      return {
        itemName: itemToEdit.itemName,
        description: itemToEdit.description || "",
        quantity: itemToEdit.quantity,
        unitPrice: itemToEdit.unitPrice,
        itemType: itemToEdit.itemType,
      };
    }
    return {
      itemName: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
      itemType: "product" as "product" | "service",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    // Reset form to initial state based on whether editing or creating
    setFormData(getInitialFormData());
    onClose();
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.itemName.trim()) {
      toast.error("Item name is required");
      return;
    }
    if (formData.quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    if (formData.unitPrice < 0) {
      toast.error("Unit price cannot be negative");
      return;
    }

    try {
      if (isEditing && itemToEdit) {
        await updateMutation.mutateAsync({
          id: itemToEdit.id,
          data: {
            itemName: formData.itemName,
            description: formData.description || undefined,
            quantity: formData.quantity,
            unitPrice: formData.unitPrice,
            itemType: formData.itemType,
          },
        });
        toast.success("Item updated successfully");
      } else {
        await createMutation.mutateAsync({
          documentId,
          itemName: formData.itemName,
          description: formData.description || undefined,
          quantity: formData.quantity,
          unitPrice: formData.unitPrice,
          itemType: formData.itemType,
        });
        toast.success("Item added successfully");
      }
      handleClose();
    } catch {
      toast.error(isEditing ? "Failed to update item" : "Failed to add item");
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const calculatedTotal = formData.quantity * formData.unitPrice;

  return (
    <Dialog open={open} onOpenChange={handleClose} key={itemToEdit?.id || 'new'}>
      <DialogContent className="flex! flex-col! max-w-2xl! w-[95vw]! max-h-[95vh]! overflow-y-auto! p-0! gap-0! rounded-lg!">
        {/* Header */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 px-8 py-6 border-b border-primary/10 shrink-0 sticky top-0 z-10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isEditing ? "Edit Inventory Item" : "Add Inventory Item"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update the item details below"
                : "Add a new product or service to this document"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-8 py-6">
            {/* Item Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Item Information
              </h3>
              
              {/* Item Type */}
              <div className="space-y-2">
                <Label htmlFor="itemType" className="text-sm font-medium">
                  Item Type
                </Label>
                <Select
                  value={formData.itemType}
                  onValueChange={(value: "product" | "service") =>
                    handleInputChange("itemType", value)
                  }
                >
                  <SelectTrigger id="itemType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span>Product</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="service">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Service</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="itemName" className="text-sm font-medium">
                  Item Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="itemName"
                  placeholder="Enter item or service name"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  className="font-medium"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter item description (optional)"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Pricing Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Pricing Details
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", parseInt(e.target.value) || 1)
                    }
                    className="font-medium"
                  />
                </div>

                {/* Unit Price */}
                <div className="space-y-2">
                  <Label htmlFor="unitPrice" className="text-sm font-medium">
                    Unit Price ($) <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.unitPrice}
                    onChange={(e) =>
                      handleInputChange("unitPrice", parseFloat(e.target.value) || 0)
                    }
                    className="font-medium"
                  />
                </div>
              </div>

              {/* Total Price Display */}
              <div className="p-5 bg-primary/5 rounded-lg border-2 border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Price:
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    ${calculatedTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Calculation:</span>
                  <span className="font-mono">
                    {formData.quantity} × ${formData.unitPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-8 py-4 border-t border-border bg-muted/30 shrink-0 sticky bottom-0 z-10">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              isEditing ? "Update Item" : "Add Item"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInventoryItemModal;
