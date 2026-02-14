
import type { DocumentResponse } from "@/types/document.types";
import type { BusinessProfile } from "@/types/profile.types";
import type { Customer } from "@/types/customer.types";

interface PdfHeaderProps {
  document: DocumentResponse;
  profile?: BusinessProfile | null;
  customer?: Customer | null;
}

const PdfHeader = ({ document, profile, customer }: PdfHeaderProps) => {
  const getDocumentTitle = (type: string) => {
    switch (type) {
      case "invoice":
        return "Invoice";
      case "estimate":
        return "Estimate";
      case "purchase_order":
        return "Purchase Order";
      case "rental_proposal":
        return "Rental Proposal";
      default:
        return "Document";
    }
  };

  // Fallback to hardcoded values if profile is not available
  const businessName = profile?.businessName || "Forklift and Machinery Maintenance Centre";
  const address = profile?.address || "268/4/6, Pitipana South, Ambahena, Kiriwaththuduwa";
  const emails = profile?.emailAddresses || ["sachinfmrc@gmail.com", "maintainfmrc@gmail.com"];
  const contacts = profile?.contactNumbers || ["0755264100", "0777658778"];
  const logoUrl = profile?.logo;
  const regNumber = profile?.registrationNumber || document.id;

  return (
    <div className="mb-4 print:mb-3">
      {/* Company Header */}
      <div className="flex items-start justify-between mb-3 pb-2 border-b-2 border-gray-300 print:mb-2 print:pb-1">
        {/* Company Info */}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900 mb-2 print:text-lg print:mb-1">
            {businessName}
          </h1>
          <div className="space-y-0.5 text-sm text-gray-700 print:text-xs">
            <p>{address}</p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email</span>
              <span>:</span>
              <div className="flex flex-col">
                {emails.map((email, index) => (
                  <a 
                    key={index}
                    href={`mailto:${email}`} 
                    className="text-blue-600 hover:underline"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Contact</span>
              <span>:</span>
              <span>{contacts.join(" / ")}</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="shrink-0 ml-4">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={businessName}
              className="w-40 h-32 object-contain print:w-36 print:h-28"
            />
          ) : (
            <div className="w-40 h-32 bg-linear-to-br from-red-600 via-yellow-500 to-orange-600 flex items-center justify-center print:w-36 print:h-28">
              <div className="text-white font-bold text-4xl print:text-3xl">
                {businessName.split(' ').map(word => word[0]).join('').slice(0, 4)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document & Customer Info Row */}
      <div className="grid grid-cols-2 gap-4 mb-3 print:gap-3 print:mb-2">
        {/* Document Details */}
        <div className="border-2 border-gray-300 p-2 print:p-1.5">
          <div className="space-y-1 text-sm print:text-xs print:space-y-0.5">
            <div className="flex items-start">
              <span className="w-24 font-semibold">Reg No</span>
              <span className="mr-2">:</span>
              <span>{regNumber}</span>
            </div>
            <div className="flex items-start">
              <span className="w-24 font-semibold">{getDocumentTitle(document.documentType)} No</span>
              <span className="mr-2">:</span>
              <span>{document.documentNo}</span>
            </div>
            <div className="flex items-start">
              <span className="w-24 font-semibold">Date</span>
              <span className="mr-2">:</span>
              <span>{new Date(document.mentionedDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-start">
              <span className="w-24 font-semibold">Customer No</span>
              <span className="mr-2">:</span>
              <span>{customer?.registrationNumber || document.customerId}</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="border-2 border-gray-300 p-2 print:p-1.5">
          <div className="space-y-1 text-sm print:text-xs print:space-y-0.5">
            <p className="font-bold text-sm print:text-xs">{customer?.companyName || document.customerName}</p>
            {customer && (
              <>
                <div className="space-y-0.5 text-gray-700">
                  <p><span className="font-medium">Address:</span> {customer.address}</p>
                  <p><span className="font-medium">Contact:</span> {customer.contactPerson}</p>
                  <p><span className="font-medium">Email:</span> {customer.email}</p>
                  <p><span className="font-medium">Phone:</span> {customer.phone}</p>
                </div>
              </>
            )}
            {!customer && (
              <p className="text-gray-600">Customer Information</p>
            )}
          </div>
        </div>
      </div>

      {/* Document Title */}
      <div className="text-right mb-2 print:mb-1">
        <h2 className="text-2xl font-bold text-gray-900 print:text-xl">{getDocumentTitle(document.documentType)}</h2>
      </div>
    </div>
  );
};

export default PdfHeader;