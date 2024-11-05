import compraService from "@/services/CompraService";
import productoService from "@/services/ProductoService";
import proveedorService from "@/services/ProveedorService";
import { useQuery } from "@tanstack/react-query";
import Cabecera from "./components/Cabecera";
import Tabla from "./components/Tabla";

export default function ComprasView() {
  const { data: compras, isLoading } = useQuery({
    queryKey: ["compras"],
    queryFn: compraService.getAll,
  });

  const { data: productos } = useQuery({
    queryKey: ["productos"],
    queryFn: productoService.getAll,
  });

  const { data: proveedores } = useQuery({
    queryKey: ["proveedores"],
    queryFn: proveedorService.getAll,
  });

  if (isLoading) return "...cargando";

  if (compras && productos && proveedores) {
    return (
      <main className="flex-grow flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
        <Cabecera />
        <Tabla data={compras} productos={productos} proveedores={proveedores} />
      </main>
    );
  }
}
