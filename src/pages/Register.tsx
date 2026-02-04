import Registerform from "@/components/auth/Register-Form";
import { useAuthUser } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const user = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return <Registerform />;
};

export default Register;
