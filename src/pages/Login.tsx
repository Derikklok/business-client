import { GalleryVerticalEnd } from "lucide-react"
import Loginform from "@/components/auth/Login-Form"
import { useAuthUser } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {
  const user = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-linear-to-br from-background via-primary/5 to-muted/30 flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]" />
      
      <div className="flex w-full max-w-md flex-col gap-6 sm:gap-8 relative z-10">
        {/* Enhanced Logo Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
          <div className="p-3 bg-linear-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl shadow-xl shadow-primary/20">
            <GalleryVerticalEnd className="w-8 h-8" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Forklift & Machinery Centre
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Professional Equipment Management
            </p>
          </div>
        </div>
        <Loginform />
      </div>
    </div>
  )
}

export default Login