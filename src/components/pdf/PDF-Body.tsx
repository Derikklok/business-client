
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
    <div className="mb-8">
      {/* Business Type */}
      <div className="border-2 border-gray-300 p-3 mb-4">
        <div className="flex items-center gap-4">
          <span className="font-bold text-base">Business Type</span>
          <span>:</span>
          <span className="text-base">{document.documentTitle || formatDocumentType(document.documentType)}</span>
        </div>
      </div>

      {/* Items Table */}
      {inventory && inventory.items.length > 0 ? (
        <div className="border-2 border-gray-300 overflow-hidden mb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-black text-white">
                <th className="text-left p-3 font-semibold">Description</th>
                <th className="text-right p-3 font-semibold">Unit Price [{inventory.currency}]</th>
                <th className="text-right p-3 font-semibold">Units</th>
                <th className="text-right p-3 font-semibold">Value [{inventory.currency}]</th>
              </tr>
            </thead>
            <tbody>
              {inventory.items.map((item, index) => (
                <tr key={item.id || index} className="border-b border-gray-300">
                  <td className="p-3 text-left">
                    <div className="font-medium">{item.description}</div>
                    {item.notes && (
                      <div className="text-xs text-gray-600 mt-1">{item.notes}</div>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    {inventory.currency} {item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3 text-right">{item.quantity}</td>
                  <td className="p-3 text-right font-medium">
                    {inventory.currency} {item.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}

              {/* Empty rows for spacing */}
              <tr className="border-b border-gray-300">
                <td className="p-3" colSpan={4}>&nbsp;</td>
              </tr>

              {/* Subtotal Row */}
              <tr className="bg-gray-100 border-b border-gray-300">
                <td className="p-3 text-right font-semibold" colSpan={2}>Sub. Total</td>
                <td className="p-3"></td>
                <td className="p-3 text-right font-bold">
                  {inventory.currency} {inventory.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>

              {/* Discount Row */}
              {inventory.discount > 0 && (
                <tr className="border-b border-gray-300">
                  <td className="p-3 text-right text-orange-600" colSpan={2}>Discount</td>
                  <td className="p-3"></td>
                  <td className="p-3 text-right text-orange-600">
                    -{inventory.currency} {inventory.discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )}

              {/* Tax Row */}
              {inventory.tax > 0 && (
                <tr className="border-b border-gray-300">
                  <td className="p-3 text-right text-blue-600" colSpan={2}>Tax</td>
                  <td className="p-3"></td>
                  <td className="p-3 text-right text-blue-600">
                    +{inventory.currency} {inventory.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              )}

              {/* Final Value Row */}
              <tr className="bg-gray-50">
                <td className="p-4 text-right font-bold text-lg" colSpan={2}>Final Value</td>
                <td className="p-4 text-right font-semibold">{inventory.currency}</td>
                <td className="p-4 text-right font-bold text-lg text-primary">
                  {inventory.currency} {inventory.finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>

              {/* Payment Option Row */}
              {inventory.paymentOption && (
                <tr className="bg-black text-white">
                  <td className="p-3 font-semibold">Payment Option</td>
                  <td className="p-3 text-right font-semibold" colSpan={3}>{inventory.paymentOption}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border-2 border-gray-300 p-8 text-center text-gray-500 mb-4">
          No inventory items available for this document
        </div>
      )}

      {/* Special Notes */}
      {document.specialNotes && (
        <div className="border-2 border-gray-300 p-4 mb-4">
          <h3 className="font-semibold text-sm mb-2">Special Notes:</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{document.specialNotes}</p>
        </div>
      )}

      {/* Terms and Conditions */}
      {document.termsAndConditions && (
        <div className="border-2 border-gray-300 p-4 mb-4">
          <h3 className="font-semibold text-sm mb-2">Terms and Conditions:</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{document.termsAndConditions}</p>
        </div>
      )}
    </div>
  );
};

export default PdfBody;