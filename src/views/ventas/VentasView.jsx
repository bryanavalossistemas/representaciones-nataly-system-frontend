import ventaService from "@/services/VentaService";
import productoService from "@/services/ProductoService";
import { useQuery } from "@tanstack/react-query";
import Cabecera from "./components/Cabecera";
import Tabla from "./components/Tabla";
import clienteService from "@/services/ClienteService";

export default function VentasView() {
  const { data: ventas, isLoading } = useQuery({
    queryKey: ["ventas"],
    queryFn: ventaService.getAll,
  });

  const { data: productos } = useQuery({
    queryKey: ["productos"],
    queryFn: productoService.getAll,
  });

  const { data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: clienteService.getAll,
  });

  if (isLoading) return "...cargando";

  if (ventas && productos && clientes) {
    return (
      <main className="flex-grow flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
        <Cabecera />
        <Tabla data={ventas} productos={productos} clientes={clientes} />
      </main>
    );
  }
}
