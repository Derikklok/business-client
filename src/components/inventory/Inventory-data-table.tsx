import { Badge } from "@/components/ui/badge";
import { Package, Weight, Ruler } from "lucide-react";
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

interface InventoryDataTableProps {
  items: InventoryItem[];
  isLoading?: boolean;
}

const InventoryDataTable = ({ items, isLoading }: InventoryDataTableProps) => {
  
  const getUnitTypeIcon = (unitType: string) => {
    switch (unitType) {
      case "unit":
        return <Package className="w-4 h-4 text-blue-500" />;
      case "weight":
        return <Weight className="w-4 h-4 text-orange-500" />;
      case "volume":
        return <Ruler className="w-4 h-4 text-green-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getUnitTypeColor = (unitType: string) => {
    switch (unitType) {
      case "unit":
        return "bg-blue-100 text-blue-700";
      case "weight":
        return "bg-orange-100 text-orange-700";
      case "volume":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.value, 0);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Unit Type</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i}>
                  <TableCell><div className="h-4 bg-muted animate-pulse rounded w-32"></div></TableCell>
                  <TableCell><div className="h-4 bg-muted animate-pulse rounded w-20"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-16 ml-auto"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-20 ml-auto"></div></TableCell>
                  <TableCell className="text-right"><div className="h-4 bg-muted animate-pulse rounded w-24 ml-auto"></div></TableCell>
                  <TableCell><div className="h-4 bg-muted animate-pulse rounded w-32"></div></TableCell>
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
          <h3 className="text-lg font-semibold mb-2">No items in inventory</h3>
          <p className="text-muted-foreground text-sm text-center">
            Edit the inventory to add items
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-62.5">Description</TableHead>
                <TableHead className="w-30">Unit Type</TableHead>
                <TableHead className="text-right w-25">Quantity</TableHead>
                <TableHead className="text-right w-30">Unit Price</TableHead>
                <TableHead className="text-right w-30">Value</TableHead>
                <TableHead className="min-w-50">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getUnitTypeIcon(item.unitType)}
                      {item.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getUnitTypeColor(item.unitType)}`}
                    >
                      {item.unitType.charAt(0).toUpperCase() + item.unitType.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${item.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    ${item.value.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="truncate" title={item.notes || "No notes"}>
                      {item.notes || "—"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {/* Total Row */}
              <TableRow className="border-t-2 border-primary/20 bg-primary/5 font-bold">
                <TableCell colSpan={4} className="text-right">
                  Total Value:
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
  );
};

export default InventoryDataTable;