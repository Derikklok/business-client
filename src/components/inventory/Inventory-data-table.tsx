
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package, Wrench } from "lucide-react";
import type { InventoryItem } from "@/types/inventory.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import CreateInventoryItemModal from "./Create-inventory-item-modal";
import { useDeleteInventoryItem } from "@/hooks/useInventory";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface InventoryDataTableProps {
  items: InventoryItem[];
  isLoading?: boolean;
  documentId: string;
}

const InventoryDataTable = ({ items, isLoading, documentId }: InventoryDataTableProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);
  
  const deleteMutation = useDeleteInventoryItem();

  const handleEditItem = (item: InventoryItem) => {
    setItemToEdit(item);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setItemToEdit(null);
  };

  const handleDeleteClick = (item: InventoryItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteMutation.mutateAsync(itemToDelete.id);
      toast.success("Item deleted successfully");
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 bg-muted animate-pulse rounded w-32"></div></TableCell>
                  <TableCell><div className="h-4 bg-muted animate-pulse rounded w-20"></div></TableCell>
                  <TableCell><div className="h-4 bg-muted animate-pulse rounded w-48"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-16 ml-auto"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-20 ml-auto"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-24 ml-auto"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-20 ml-auto"></div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Package className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No items added yet</h3>
          <p className="text-muted-foreground text-sm">
            Start by adding items or services to this document
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-50">Item Name</TableHead>
                  <TableHead className="w-25">Type</TableHead>
                  <TableHead className="min-w-62.5">Description</TableHead>
                  <TableHead className="text-right w-25">Quantity</TableHead>
                  <TableHead className="text-right w-30">Unit Price</TableHead>
                  <TableHead className="text-right w-30">Total</TableHead>
                  <TableHead className="text-right w-30">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {item.itemType === "product" ? (
                          <Package className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Wrench className="w-4 h-4 text-purple-500" />
                        )}
                        {item.itemName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          item.itemType === "product" 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {item.itemType === "product" ? "Product" : "Service"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-62.5">
                      <div className="truncate text-muted-foreground" title={item.description || "No description"}>
                        {item.description || "—"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${item.unitPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      ${item.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => handleEditItem(item)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow className="border-t-2 border-primary/20 bg-primary/5 font-bold">
                  <TableCell colSpan={5} className="text-right">
                    Total Amount:
                  </TableCell>
                  <TableCell className="text-right text-primary text-lg">
                    ${calculateTotal().toFixed(2)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <CreateInventoryItemModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        documentId={documentId}
        itemToEdit={itemToEdit}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{itemToDelete?.itemName}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InventoryDataTable;