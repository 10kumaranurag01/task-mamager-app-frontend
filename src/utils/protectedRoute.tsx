import { useAuth } from "../lib/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isUserAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isUserAuthenticated) {
    navigate("/");
  }

  return children;
};

export default ProtectedRoute;
