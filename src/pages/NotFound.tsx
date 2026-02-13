import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-primary/10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-12 h-12 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            onClick={() => navigate("/dashboard/customers")}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="pt-8 text-sm text-muted-foreground">
          <p>Need help? Contact support or check our documentation.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
