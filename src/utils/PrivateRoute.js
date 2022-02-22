import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute({ children, ...rest }) {
  const { user } = useAuth();
  console.log("user: ", user);

  return user ? children : <Navigate to="/login" />;
}
