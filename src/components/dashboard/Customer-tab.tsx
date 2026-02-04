
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import CustomerDataTable from "@/components/customers/Customer-data-table";
import CreateCustomerModel from "@/components/customers/Create-customer-model";

const Customertab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header with action button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Customers</h2>
          <p className="text-sm text-muted-foreground">Manage and organize your customer information</p>
        </div>
        <Button 
          className="gap-2 w-full sm:w-auto"
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