import { useAuthUser } from "@/hooks/useAuth";
import { clearUser } from "@/lib/auth";
import { useNavigate, useLocation, Outlet, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Users, FileText, Building2, Settings } from "lucide-react";
import SearchBar from "@/components/search/SearchBar";
import NotificationDropdown from "@/components/notifications/NotificationDropdown";
import CloudResourcesPanel from "@/components/cloud/CloudResourcesPanel";

export default function Dashboard() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Redirect to customers tab if on base dashboard route
  useEffect(() => {
    if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
      navigate("/dashboard/customers", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-linear-to-r from-primary to-primary/90 text-primary-foreground border-b border-primary/30 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-lg border border-white/30">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Management Centre</h1>
                <p className="text-sm text-white/70 mt-1">Welcome back, {user.name}</p>
              </div>
            </div>

            {/* Center: Search Bar */}
            <SearchBar />

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <NotificationDropdown />

              {/* Cloud Resources */}
              <CloudResourcesPanel />

              {/* Logout */}
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm" 
                className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <NavLink
            to="/dashboard/customers"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              }`
            }
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Customers</span>
            <span className="sm:hidden">Customers</span>
          </NavLink>
          <NavLink
            to="/dashboard/documents"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              }`
            }
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Documents</span>
            <span className="sm:hidden">Docs</span>
          </NavLink>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
              }`
            }
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
            <span className="sm:hidden">Profile</span>
          </NavLink>
        </div>

        {/* Route Content */}
        <div className="space-y-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

