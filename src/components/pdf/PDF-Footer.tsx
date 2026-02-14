import type { BusinessProfile } from "@/types/profile.types";

interface PdfFooterProps {
  profile?: BusinessProfile | null;
}

const PdfFooter = ({ profile }: PdfFooterProps) => {
  // Fallback to hardcoded values if profile is not available
  const businessName = profile?.businessName || "Forklift and Machinery Maintenance Centre";
  const address = profile?.address || "268/4/6, Pitipana South, Ambahena, Kiriwaththuduwa";
  const emails = profile?.emailAddresses?.[0] || "sachinfmrc@gmail.com";
  const contacts = profile?.contactNumbers || ["0755264100", "0777658778"];

  return (
    <div className="space-y-3 print:space-y-1 print:mt-2">
      {/* Thank You Section */}
      <div className="border-2 border-gray-300 p-3 text-center print:p-1 print:border-0">
        <p className="text-xl font-bold text-gray-800 print:text-sm print:font-semibold">Thank You</p>
        <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">For Your Business</p>
      </div>

      {/* Signature Section */}
      <div className="flex justify-end signature-section">
        <div className="border-2 border-gray-300 p-3 w-72 print:p-1 print:w-60 print:border-0">
          <div className="space-y-2 print:space-y-0 print:text-xs">
            <div className="pb-1 border-b border-gray-300 print:pb-0 print:border-b-0">
              <p className="text-sm text-gray-600 print:text-xs">Authorized Signature</p>
            </div>
            <div className="pt-2 space-y-0.5 print:pt-0.5 print:space-y-0">
              <p className="font-bold text-sm print:text-xs print:font-semibold">Sachin Pasindu</p>
              <p className="text-sm text-gray-700 print:text-xs">Operations Executive</p>
              <p className="text-xs text-gray-600 font-medium print:text-[10px]">
                {businessName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-gray-500 pt-2 print:pt-0.5 print:text-[10px] print:border-t-0">
        <p>For inquiries, contact us at: {emails} | {contacts.join(" / ")}</p>
        <p className="mt-0.5 print:mt-0">&#8203;{address}</p>
      </div>
    </div>
  );
};

export default PdfFooter;
