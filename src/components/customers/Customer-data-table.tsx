
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
import { useCustomers } from "@/hooks/useCustomers";
import { Loader2, Edit2, Trash2, Eye } from "lucide-react";
import type { Customer } from "@/types/customer.types";

const CustomerDataTable = () => {
  const { data: customers = [], isLoading, error } = useCustomers();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

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
                        onClick={() => setSelectedCustomer(customer)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
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

      {/* Detail View Modal Placeholder */}
      {selectedCustomer && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedCustomer.companyName}</h3>
                <p className="text-sm text-muted-foreground">Registration: {selectedCustomer.registrationNumber}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Contact Person</p>
                <p className="font-medium">{selectedCustomer.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{selectedCustomer.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{selectedCustomer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{selectedCustomer.address}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{selectedCustomer.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerDataTable;