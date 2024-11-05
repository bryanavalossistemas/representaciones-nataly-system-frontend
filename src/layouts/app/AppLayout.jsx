import Footer from "@/components/ui/Footer";
import { useAutenticacion } from "@/hooks/UseAutenticacion";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";

export default function AdminLayout() {
  const { data: usuario, isError, isLoading } = useAutenticacion();
  const navegar = useNavigate();

  if (isLoading) return "Cargando...";

  if (isError) {
    return navegar("/");
  }

  if (usuario) {
    return (
      <div className="h-lvh flex flex-col">
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
}
