
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDocument } from "@/hooks/useDocuments";
import { useInventory } from "@/hooks/useInventory";
import { useProfile } from "@/hooks/useProfile";
import { useCustomer } from "@/hooks/useCustomers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Printer } from "lucide-react";
import PdfHeader from "@/components/pdf/PDF-Header";
import PdfBody from "@/components/pdf/PDF-Body";
import PdfFooter from "@/components/pdf/PDF-Footer";
import "../components/pdf/pdf-print.css";

const PdfDashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const documentId = searchParams.get("documentId");

  const { data: document, isLoading: isLoadingDoc } = useDocument(documentId || "");
  const { data: inventory, isLoading: isLoadingInventory } = useInventory(documentId || "");
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: customer, isLoading: isLoadingCustomer } = useCustomer(document?.customerId || "");

  const handlePrint = () => {
    window.print();
  };

  if (!documentId) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No document selected</p>
            <Button 
              onClick={() => navigate("/dashboard/documents")} 
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoadingDoc || isLoadingInventory || isLoadingProfile || isLoadingCustomer) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="py-12">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">Document not found</p>
            <Button 
              onClick={() => navigate("/dashboard/documents")} 
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons - Hidden when printing */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 print:hidden">
        <Button 
          onClick={() => navigate("/dashboard/documents")} 
          variant="outline"
          size="sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
          Back
        </Button>
        <Button 
          onClick={handlePrint}
          className="gap-1 sm:gap-2 w-full sm:w-auto"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
      </div>

      {/* PDF Document Container */}
      <Card className="print:shadow-none print:border-0 pdf-container">
        <CardContent className="p-0">
          {/* A4 Paper-like container - More compact */}
          <div className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto p-6 print:p-4 print:text-sm print-compact">
            <PdfHeader document={document} profile={profile} customer={customer} />
            <PdfBody document={document} inventory={inventory} />
            <div className="pdf-footer">
              <PdfFooter profile={profile} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfDashboard;