
import { useRegister } from "@/hooks/useAuth";
import { saveUser } from "@/lib/auth";
import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Registerform = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const register = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await register.mutateAsync({ 
        name, 
        email, 
        password, 
        confirmPassword 
      });
      saveUser(result);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-linear-to-br from-background via-primary/5 to-muted/30 flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.2),transparent_50%)]" />
      
      <div className="flex w-full max-w-md flex-col gap-8 relative z-10">
        {/* Enhanced Logo Section */}
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="p-3 bg-linear-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl shadow-xl shadow-primary/20">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Forklift & Machinery Centre
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              Professional Equipment Management
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-8">
          <Card className="shadow-2xl bg-card/95 backdrop-blur-xl border border-primary/10">
            {/* Enhanced Header */}
            <CardHeader className="text-center pb-6 bg-linear-to-r from-primary/5 to-transparent border-b border-primary/10">
              <div className="space-y-3">
                <CardTitle className="text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Create your account
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium">
                  Join us and start managing your business professionally
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <FieldGroup className="space-y-5">
                  <Field>
                    <FieldLabel 
                      htmlFor="name" 
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Full name
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={register.isPending}
                      className="h-12 border-primary/20 bg-background/50 focus:bg-background focus:border-primary/40 transition-all duration-200 font-medium"
                    />
                  </Field>
                  <Field>
                    <FieldLabel 
                      htmlFor="email" 
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Email address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={register.isPending}
                      className="h-12 border-primary/20 bg-background/50 focus:bg-background focus:border-primary/40 transition-all duration-200 font-medium"
                    />
                  </Field>
                  <Field>
                    <FieldLabel 
                      htmlFor="password" 
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Password
                    </FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={register.isPending}
                      className="h-12 border-primary/20 bg-background/50 focus:bg-background focus:border-primary/40 transition-all duration-200 font-medium"
                    />
                    <FieldDescription className="text-xs text-muted-foreground mt-2 font-medium">
                      Must be at least 6 characters long
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel 
                      htmlFor="confirmPassword" 
                      className="text-sm font-semibold text-foreground/90"
                    >
                      Confirm password
                    </FieldLabel>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={register.isPending}
                      className="h-12 border-primary/20 bg-background/50 focus:bg-background focus:border-primary/40 transition-all duration-200 font-medium"
                    />
                  </Field>
                  <Field className="pt-3">
                    <Button 
                      type="submit" 
                      disabled={register.isPending || !name || !email || !password || !confirmPassword}
                      className="w-full h-12 font-semibold text-base bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                    >
                      {register.isPending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating account...
                        </>
                      ) : (
                        "Create account"
                      )}
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
              
              <div className="text-center pt-2">
                <FieldDescription className="text-muted-foreground font-medium">
                  Already have an account? {" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/70 font-semibold transition-colors hover:underline"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </div>
            </CardContent>
          </Card>
          
          <FieldDescription className="text-center text-xs text-muted-foreground px-8 leading-relaxed font-medium">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:text-primary/70 transition-colors hover:underline font-semibold">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-primary/70 transition-colors hover:underline font-semibold">
              Privacy Policy
            </a>
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default Registerform;