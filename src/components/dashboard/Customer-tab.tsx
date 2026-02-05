
import { Button } from "@/components/ui/button";
import { Plus, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomerDataTable from "@/components/customers/Customer-data-table";
import CreateCustomerModel from "@/components/customers/Create-customer-model";

const Customertab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-linear-to-r from-primary/5 to-transparent rounded-lg border border-primary/10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Customers
              </h2>
              <p className="text-sm text-muted-foreground">Manage and organize your customer information</p>
            </div>
          </div>
        </div>
        <Button 
          className="gap-2"
          onClick={() => setCreateModalOpen(true)}
        >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Customer Data Table */}
      <CustomerDataTable />

      {/* Create Customer Sheet */}
      <CreateCustomerModel
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  )
}

export default Customertab