
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Customer } from "@/types/dashboard.types";

const Customertab = () => {
  // Placeholder state - will be replaced with actual data management
  const customers: Customer[] = [];

  return (
    <div className="space-y-6">
      {/* Header with action button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-sm text-muted-foreground">Manage and organize your customer information</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers by name, email, or phone..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Empty State */}
      {customers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No customers yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              Start by adding your first customer to get started with managing your business contacts
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Your First Customer
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Customer List - will be populated with data */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder cards */}
          {customers.map((customer, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{customer.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <Mail className="w-3 h-3" />
                  {customer.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {customer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {customer.address}
                </div>
                <div className="pt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-destructive hover:text-destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Customertab