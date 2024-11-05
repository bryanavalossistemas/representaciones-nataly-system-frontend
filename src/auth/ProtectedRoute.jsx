import { useAutenticacion } from "@/hooks/UseAutenticacion";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ roles, children }) {
  const { data, isError, isLoading } = useAutenticacion();

  if (!data) {
    return <Navigate to="/" replace />;
  }

  if (!roles.includes(data.rolId)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
