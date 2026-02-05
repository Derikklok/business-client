
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCustomers, useDeleteCustomer } from "@/hooks/useCustomers";
import { Loader2, Edit2, Trash2, Eye, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { Customer } from "@/types/customer.types";
import CustomerDetailsModel from "./Customer-details-model";
import EditCustomerModel from "./Edit-Customer-model";

const CustomerDataTable = () => {
  const { data: customers = [], isLoading, error } = useCustomers();
  const deleteCustomer = useDeleteCustomer();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setEditModalOpen(true);
  };

  const handleDeleteCustomer = (customer: Customer) => {
    setDeletingCustomer(customer);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingCustomer) return;

    try {
      await deleteCustomer.mutateAsync(deletingCustomer.id);
      toast.success(`Customer "${deletingCustomer.companyName}" deleted successfully`);
      setDeleteAlertOpen(false);
      setDeletingCustomer(null);
    } catch (error) {
      toast.error("Failed to delete customer");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading customers...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-destructive font-semibold">Error loading customers</p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {error instanceof Error ? error.message : "An error occurred while fetching customers"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (customers.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">No customers found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary">
                <TableRow className="border-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-semibold">Registration No.</TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Company Name</TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Contact Person</TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Email</TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Phone</TableHead>
                  <TableHead className="text-primary-foreground font-semibold">Address</TableHead>
                  <TableHead className="text-primary-foreground font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium text-sm">{customer.registrationNumber}</TableCell>
                    <TableCell className="font-medium">{customer.companyName}</TableCell>
                    <TableCell>{customer.contactPerson}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell className="max-w-xs truncate">{customer.address}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewCustomer(customer)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCustomer(customer)}
                        className="gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer)}
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <CustomerDetailsModel
        customer={selectedCustomer}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      {/* Edit Customer Modal */}
      <EditCustomerModel
        customer={editingCustomer}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />

      {/* Delete Customer Alert Dialog */}
      <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent className="max-w-md border-destructive/30 rounded-xl p-0 overflow-hidden shadow-lg">
          {/* Icon and Title Section with Gradient Background */}
          <div className="bg-linear-to-br from-destructive/10 via-destructive/5 to-transparent p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-foreground mb-2">
              Delete Customer
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
              This action cannot be undone. Please confirm to proceed.
            </AlertDialogDescription>
          </div>

          {/* Content Section */}
          <div className="px-6 py-4 border-t border-border/50">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                You are about to delete:
              </p>
              <div className="bg-muted/50 border border-destructive/20 rounded-lg p-3">
                <p className="font-semibold text-foreground wrap-break-word">
                  {deletingCustomer?.companyName}
                </p>
              </div>
              <p className="text-xs text-destructive/80 leading-relaxed pt-2">
                All associated customer records and data will be permanently removed from the system. This cannot be recovered.
              </p>
            </div>
          </div>

          {/* Footer Section */}
          <div className="px-6 py-4 border-t border-border/50 bg-muted/30 flex gap-3 justify-end">
            <AlertDialogCancel className="min-w-24 rounded-lg">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteCustomer.isPending}
              className="gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg min-w-24 font-semibold transition-all"
            >
              {deleteCustomer.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {deleteCustomer.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CustomerDataTable;