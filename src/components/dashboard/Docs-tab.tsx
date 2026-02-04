
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Filter, FileText, DollarSign, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Document } from "@/types/dashboard.types";

const Documentstab = () => {
  // Placeholder state - will be replaced with actual data management
  const documents: Document[] = [];
  const docTypes = ["Invoices", "Estimates", "Quotes", "All"];

  return (
    <div className="space-y-6">
      {/* Header with action button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Documents</h2>
          <p className="text-sm text-muted-foreground">Create and manage invoices, estimates, and quotes</p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
          <Button variant="outline" className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Estimate
          </Button>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Invoice
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search documents..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Document type" />
          </SelectTrigger>
          <SelectContent>
            {docTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      {documents.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No documents yet</h3>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              Create your first invoice or estimate to begin tracking your business documents
            </p>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Invoice
              </Button>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Create Estimate
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Documents List - will be populated with data */
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{doc.documentNumber}</h3>
                    <p className="text-xs text-muted-foreground">{doc.customerName}</p>
                    <div className="flex gap-3 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {doc.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium">
                        <DollarSign className="w-3 h-3" />
                        {doc.amount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    doc.status === "paid" ? "bg-green-100 text-green-700" :
                    doc.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {doc.status}
                  </span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Documentstab;
