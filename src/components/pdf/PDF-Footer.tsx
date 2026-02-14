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
    <div className="space-y-6">
      {/* Thank You Section */}
      <div className="border-2 border-gray-300 p-6 text-center">
        <p className="text-2xl font-bold text-gray-800">Thank You</p>
        <p className="text-sm text-gray-600 mt-2">For Your Business</p>
      </div>

      {/* Signature Section */}
      <div className="flex justify-end">
        <div className="border-2 border-gray-300 p-6 w-80">
          <div className="space-y-3">
            <div className="pb-2 border-b border-gray-300">
              <p className="text-sm text-gray-600">Authorized Signature</p>
            </div>
            <div className="pt-4 space-y-1">
              <p className="font-bold text-base">Sachin Pasindu</p>
              <p className="text-sm text-gray-700">Operations Executive</p>
              <p className="text-xs text-gray-600 font-medium">
                {businessName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
        <p>For inquiries, contact us at: {emails} | {contacts.join(" / ")}</p>
        <p className="mt-1">{address}</p>
      </div>
    </div>
  );
};

export default PdfFooter;
