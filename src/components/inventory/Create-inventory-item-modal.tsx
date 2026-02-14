import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import type { InventoryResponse } from "@/types/inventory.types";
import { useCreateInventory, useUpdateInventory } from "@/hooks/useInventory";
import { Plus, Trash2, Package, Weight, Ruler } from "lucide-react";

interface InventoryItemFormData {
  description: string;
  unitPrice: number;
  quantity: number;
  unitType: "unit" | "weight" | "volume";
  notes: string;
}

interface CreateInventoryItemModalProps {
  open: boolean;
  onClose: () => void;
  documentId: string;
  inventoryToEdit?: InventoryResponse | null;
}

const CreateInventoryItemModal = ({
  open,
  onClose,
  documentId,
  inventoryToEdit,
}: CreateInventoryItemModalProps) => {
  const createMutation = useCreateInventory();
  const updateMutation = useUpdateInventory();
  const isEditing = !!inventoryToEdit;

  const getInitialFormData = () => {
    if (inventoryToEdit) {
      return {
        items: inventoryToEdit.items.map(item => ({
          description: item.description,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          unitType: item.unitType,
          notes: item.notes || "",
        })),
        discount: inventoryToEdit.discount,
        tax: inventoryToEdit.tax,
        currency: inventoryToEdit.currency,
        paymentOption: inventoryToEdit.paymentOption || "",
        paymentInfo: inventoryToEdit.paymentInfo || "",
        status: inventoryToEdit.status,
      };
    }
    return {
      items: [
        {
          description: "",
          unitPrice: 0,
          quantity: 1,
          unitType: "unit" as "unit" | "weight" | "volume",
          notes: "",
        },
      ],
      discount: 0,
      tax: 0,
      currency: "LKR",
      paymentOption: "",
      paymentInfo: "",
      status: "draft" as "draft" | "finalized",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  const handleItemChange = (index: number, field: keyof InventoryItemFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          description: "",
          unitPrice: 0,
          quantity: 1,
          unitType: "unit" as "unit" | "weight" | "volume",
          notes: "",
        },
      ],
    }));
  };

  const handleRemoveItem = (index: number) => {
    if (formData.items.length === 1) {
      toast.error("At least one item is required");
      return;
    }
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );
  };

  const calculateFinalTotal = () => {
    const subtotal = calculateSubtotal();
    return subtotal - formData.discount + formData.tax;
  };

  const handleClose = () => {
    setFormData(getInitialFormData());
    onClose();
  };

  const handleSubmit = async () => {
    // Validation
    if (formData.items.length === 0) {
      toast.error("At least one item is required");
      return;
    }

    for (let i = 0; i < formData.items.length; i++) {
      const item = formData.items[i];
      if (!item.description.trim()) {
        toast.error(`Item ${i + 1}: Description is required`);
        return;
      }
      if (item.quantity <= 0) {
        toast.error(`Item ${i + 1}: Quantity must be greater than 0`);
        return;
      }
      if (item.unitPrice < 0) {
        toast.error(`Item ${i + 1}: Unit price cannot be negative`);
        return;
      }
    }

    if (formData.discount < 0) {
      toast.error("Discount cannot be negative");
      return;
    }

    if (formData.tax < 0) {
      toast.error("Tax cannot be negative");
      return;
    }

    try {
      if (isEditing && inventoryToEdit) {
        await updateMutation.mutateAsync({
          id: inventoryToEdit.id,
          data: {
            items: formData.items,
            discount: formData.discount,
            tax: formData.tax,
            paymentOption: formData.paymentOption || undefined,
            paymentInfo: formData.paymentInfo || undefined,
            status: formData.status,
          },
        });
        toast.success("Inventory updated successfully");
      } else {
        await createMutation.mutateAsync({
          documentId,
          items: formData.items,
          discount: formData.discount,
          tax: formData.tax,
          currency: formData.currency,
          paymentOption: formData.paymentOption || undefined,
          paymentInfo: formData.paymentInfo || undefined,
        });
        toast.success("Inventory created successfully");
      }
      handleClose();
    } catch {
      toast.error(isEditing ? "Failed to update inventory" : "Failed to create inventory");
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={handleClose} key={inventoryToEdit?.id || 'new'}>
      <DialogContent className="flex! flex-col! max-w-5xl! w-[98vw]! max-h-[95vh]! overflow-y-auto! p-0! gap-0! rounded-lg!">
        {/* Header */}
        <div className="bg-linear-to-r from-primary/10 to-primary/5 px-8 py-6 border-b border-primary/10 shrink-0 sticky top-0 z-10 bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {isEditing ? "Edit Inventory" : "Create Inventory"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Update inventory items and financial details"
                : "Add items and configure financial details for this document"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-6 px-8 py-6">
            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                  Inventory Items
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg bg-muted/30 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Item {index + 1}
                      </span>
                      {formData.items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(index)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Description */}
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-medium">
                          Description <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          placeholder="Enter item description"
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(index, "description", e.target.value)
                          }
                          className="font-medium"
                        />
                      </div>

                      {/* Unit Type */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Unit Type</Label>
                        <Select
                          value={item.unitType}
                          onValueChange={(value: "unit" | "weight" | "volume") =>
                            handleItemChange(index, "unitType", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unit">
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4 text-blue-500" />
                                <span>Unit</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="weight">
                              <div className="flex items-center gap-2">
                                <Weight className="w-4 h-4 text-orange-500" />
                                <span>Weight</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="volume">
                              <div className="flex items-center gap-2">
                                <Ruler className="w-4 h-4 text-green-500" />
                                <span>Volume</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quantity */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Quantity <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", parseFloat(e.target.value) || 0)
                          }
                          className="font-medium"
                        />
                      </div>

                      {/* Unit Price */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Unit Price <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)
                          }
                          className="font-medium"
                        />
                      </div>

                      {/* Value (calculated) */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Item Value</Label>
                        <div className="p-2 bg-primary/10 rounded-md border border-primary/20">
                          <span className="text-sm font-bold text-primary">
                            {formData.currency} {(item.quantity * item.unitPrice).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-medium">Notes (Optional)</Label>
                        <Textarea
                          placeholder="Enter additional notes"
                          rows={2}
                          value={item.notes}
                          onChange={(e) =>
                            handleItemChange(index, "notes", e.target.value)
                          }
                          className="resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Financial Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                Financial Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Currency */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, currency: value }))
                    }
                    disabled={isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LKR">LKR (Sri Lankan Rupee)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                      <SelectItem value="EUR">EUR (Euro)</SelectItem>
                      <SelectItem value="GBP">GBP (British Pound)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Discount */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Discount</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))
                    }
                    className="font-medium"
                  />
                </div>

                {/* Tax */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tax</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.tax}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, tax: parseFloat(e.target.value) || 0 }))
                    }
                    className="font-medium"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Payment Option</Label>
                  <Input
                    placeholder="e.g., Bank Transfer, Cash, Card"
                    value={formData.paymentOption}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, paymentOption: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Payment Info</Label>
                  <Input
                    placeholder="e.g., Account details, reference number"
                    value={formData.paymentInfo}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, paymentInfo: e.target.value }))
                    }
                  />
                </div>
              </div>

              {/* Status */}
              {isEditing && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: "draft" | "finalized") =>
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="w-full md:w-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="finalized">Finalized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Summary */}
              <div className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20 space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Financial Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-semibold">
                      {formData.currency} {calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-semibold text-orange-600">
                      -{formData.currency} {formData.discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-semibold text-blue-600">
                      +{formData.currency} {formData.tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-muted-foreground">Final Total:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formData.currency} {calculateFinalTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-8 py-4 border-t border-border shrink-0 sticky bottom-0 z-10 bg-background">
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
              isEditing ? "Update Inventory" : "Create Inventory"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInventoryItemModal;