import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth.access
    ? children
    : <Navigate to="/login" state={{ from: location }} replace />;
}

export default PrivateRoute;