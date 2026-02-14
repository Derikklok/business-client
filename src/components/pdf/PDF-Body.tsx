
import type { DocumentResponse } from "@/types/document.types";
import type { InventoryResponse } from "@/types/inventory.types";

interface PdfBodyProps {
  document: DocumentResponse;
  inventory?: InventoryResponse | null;
}

const PdfBody = ({ document, inventory }: PdfBodyProps) => {
  const formatDocumentType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="mb-4 print:mb-3">
      {/* Business Type */}
      <div className="border-2 border-gray-300 p-2 mb-2 print:p-1.5 print:mb-1.5">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm print:text-xs">Business Type</span>
          <span>:</span>
          <span className="text-sm print:text-xs">{document.documentTitle || formatDocumentType(document.documentType)}</span>
        </div>
      </div>

      {/* Items Table */}
      {inventory && inventory.items.length > 0 ? (
        <div className="border-2 border-gray-300 overflow-hidden mb-2 avoid-break inventory-table print:mb-1.5">
          <table className="w-full text-sm print:text-xs print-border">
            <thead className="print:table-header-group">
              <tr className="bg-black text-white">
                <th className="text-left p-2 font-semibold print:p-1">Description</th>
                <th className="text-right p-2 font-semibold print:p-1">Unit Price [{inventory.currency}]</th>
                <th className="text-right p-2 font-semibold print:p-1">Units</th>
                <th className="text-right p-2 font-semibold print:p-1">Value [{inventory.currency}]</th>
              </tr>
            </thead>
            <tbody>
              {inventory.items.map((item, index) => (
                <tr key={item.id || index} className="border-b border-gray-300">
                  <td className="p-2 text-left print:p-1">
                    <div className="font-medium">{item.description}</div>
                    {item.notes && (
                      <div className="text-xs text-gray-600 mt-0.5 print:text-[10px]">{item.notes}</div>
                    )}
                  </td>
                  <td className="p-2 text-right print:p-1">
                    {inventory.currency} {item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-right print:p-1">{item.quantity}</td>
                  <td className="p-2 text-right font-medium print:p-1">
                    {inventory.currency} {item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}

              {/* Subtotal Row */}
              <tr className="bg-gray-100 border-b border-gray-300">
                <td className="p-2 text-right font-semibold print:p-1" colSpan={2}>Sub. Total</td>
                <td className="p-2 print:p-1"></td>
                <td className="p-2 text-right font-bold print:p-1">
                  {inventory.currency} {inventory.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>

              {/* Discount Row */}
              {inventory.discount > 0 && (
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-right text-orange-600 print:p-1" colSpan={2}>Discount</td>
                  <td className="p-2 print:p-1"></td>
                  <td className="p-2 text-right text-orange-600 print:p-1">
                    -{inventory.currency} {inventory.discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )}

              {/* Tax Row */}
              {inventory.tax > 0 && (
                <tr className="border-b border-gray-300">
                  <td className="p-2 text-right text-blue-600 print:p-1" colSpan={2}>Tax</td>
                  <td className="p-2 print:p-1"></td>
                  <td className="p-2 text-right text-blue-600 print:p-1">
                    +{inventory.currency} {inventory.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )}

              {/* Final Value Row */}
              <tr className="bg-gray-50">
                <td className="p-3 text-right font-bold text-base print:p-2 print:text-sm" colSpan={2}>Final Value</td>
                <td className="p-3 text-right font-semibold print:p-2">{inventory.currency}</td>
                <td className="p-3 text-right font-bold text-base text-primary print:p-2 print:text-sm">
                  {inventory.currency} {inventory.finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>

              {/* Payment Option Row */}
              {inventory.paymentOption && (
                <tr className="bg-black text-white">
                  <td className="p-2 font-semibold print:p-1">Payment Option</td>
                  <td className="p-2 text-right font-semibold print:p-1" colSpan={3}>{inventory.paymentOption}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border-2 border-gray-300 p-4 text-center text-gray-500 mb-2 print:p-3 print:mb-1.5">
          No inventory items available for this document
        </div>
      )}

      {/* Special Notes */}
      {document.specialNotes && (
        <div className="border-2 border-gray-300 p-2 mb-2 avoid-break print:p-1.5 print:mb-1.5">
          <h3 className="font-semibold text-sm mb-1 print:text-xs print:mb-0.5">Special Notes:</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap print:text-xs">{document.specialNotes}</p>
        </div>
      )}

      {/* Terms and Conditions */}
      {document.termsAndConditions && (
        <div className="border-2 border-gray-300 p-2 mb-2 avoid-break print:p-1.5 print:mb-1.5">
          <h3 className="font-semibold text-sm mb-1 print:text-xs print:mb-0.5">Terms and Conditions:</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap print:text-xs">{document.termsAndConditions}</p>
        </div>
      )}
    </div>
  );
};

export default PdfBody;