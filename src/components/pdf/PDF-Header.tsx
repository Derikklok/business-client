
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
    <div className="mb-8">
      {/* Company Header */}
      <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-gray-300">
        {/* Company Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {businessName}
          </h1>
          <div className="space-y-1 text-sm text-gray-700">
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
        <div className="shrink-0 ml-6">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={businessName}
              className="w-32 h-24 object-contain rounded-lg shadow-md"
            />
          ) : (
            <div className="w-32 h-24 bg-linear-to-br from-red-600 via-yellow-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <div className="text-white font-bold text-4xl">
                {businessName.split(' ').map(word => word[0]).join('').slice(0, 4)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Document & Customer Info Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Document Details */}
        <div className="border-2 border-gray-300 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-start">
              <span className="w-32 font-semibold">Reg No</span>
              <span className="mr-2">:</span>
              <span>{regNumber}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 font-semibold">{getDocumentTitle(document.documentType)} No</span>
              <span className="mr-2">:</span>
              <span>{document.documentNo}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 font-semibold">Date</span>
              <span className="mr-2">:</span>
              <span>{new Date(document.mentionedDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-start">
              <span className="w-32 font-semibold">Customer No</span>
              <span className="mr-2">:</span>
              <span>{customer?.registrationNumber || document.customerId}</span>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="border-2 border-gray-300 p-4">
          <div className="space-y-2 text-sm">
            <p className="font-bold text-base">{customer?.companyName || document.customerName}</p>
            {customer && (
              <>
                <div className="space-y-1 text-gray-700">
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
      <div className="text-right mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{getDocumentTitle(document.documentType)}</h2>
      </div>
    </div>
  );
};

export default PdfHeader;