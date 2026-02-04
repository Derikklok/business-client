import { useAuthUser } from "@/hooks/useAuth";
import { clearUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, FileText } from "lucide-react";
import Customertab from "@/components/dashboard/Customer-tab";
import Documentstab from "@/components/dashboard/Docs-tab";

export default function Dashboard() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customers");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Management Centre</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome back, {user.name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tabs Navigation */}
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="customers" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Customers</span>
              <span className="sm:hidden">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
              <span className="sm:hidden">Docs</span>
            </TabsTrigger>
          </TabsList>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-4">
            <Customertab />
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Documentstab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
