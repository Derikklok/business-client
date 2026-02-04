
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
    <div className="bg-linear-to-br from-background via-primary/8 to-muted/50 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-xl shadow-lg">
            <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Acme Inc.
          </h1>
        </div>
        
        <div className="flex flex-col gap-8">
          <Card className="shadow-lg border-0 bg-card/60 backdrop-blur">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Create your account
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                Join us and start managing your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <FieldGroup>
                  <Field>
                    <FieldLabel 
                      htmlFor="name" 
                      className="text-sm font-medium text-foreground"
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
                      className="h-11 border-border/50 bg-background/50 focus:bg-background transition-colors"
                    />
                  </Field>
                  <Field>
                    <FieldLabel 
                      htmlFor="email" 
                      className="text-sm font-medium text-foreground"
                    >
                      Email address
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={register.isPending}
                      className="h-11 border-border/50 bg-background/50 focus:bg-background transition-colors"
                    />
                  </Field>
                  <Field>
                    <FieldLabel 
                      htmlFor="password" 
                      className="text-sm font-medium text-foreground"
                    >
                      Password
                    </FieldLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={register.isPending}
                      className="h-11 border-border/50 bg-background/50 focus:bg-background transition-colors"
                    />
                    <FieldDescription className="text-xs text-muted-foreground mt-1">
                      Must be at least 6 characters long
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel 
                      htmlFor="confirmPassword" 
                      className="text-sm font-medium text-foreground"
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
                      className="h-11 border-border/50 bg-background/50 focus:bg-background transition-colors"
                    />
                  </Field>
                  <Field className="pt-2">
                    <Button 
                      type="submit" 
                      disabled={register.isPending || !name || !email || !password || !confirmPassword}
                      className="w-full h-11 font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
              
              <div className="text-center">
                <FieldDescription className="text-muted-foreground">
                  Already have an account? {" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </div>
            </CardContent>
          </Card>
          
          <FieldDescription className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </a>
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default Registerform;