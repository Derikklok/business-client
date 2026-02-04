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
    <div className="bg-linear-to-br from-background via-muted/30 to-muted/60 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-xl shadow-lg">
            <GalleryVerticalEnd className="size-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Acme Inc.
          </h1>
        </div>
        <Loginform />
      </div>
    </div>
  )
}

export default Login