import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { isUserAuthenticated } = useAuth();

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate("/dashboard");
    }
  }, [isUserAuthenticated, navigate]);

  return !isUserAuthenticated ? children : null;
};

export default PublicRoute;
