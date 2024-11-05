import clienteService from "@/services/ClienteService";
import productoService from "@/services/ProductoService";
import useVentasStore from "@/stores/ventasStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProductosGrid from "./components/ProductosGrid";
import VentaUI from "./components/VentaUI";

export default function POSView() {
  const resetVenta = useVentasStore((state) => state.resetVenta);

  const { data: productos, isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: productoService.getAll,
  });

  const { data: clientes } = useQuery({
    queryKey: ["clientes"],
    queryFn: clienteService.getAll,
  });

  useEffect(() => {
    resetVenta();
  }, []);

  if (isLoading) return "...cargando";

  if (productos && clientes) {
    const filteredProductos = productos.map((producto) => {
      return {
        ...producto,
        categoria: producto.categoria?.nombre,
        marca: producto.marca?.nombre,
      };
    });

    const filteredClientes = clientes.map((cliente) => {
      return {
        id: cliente.id,
        nombre: cliente.nombre,
      };
    });

    return (
      <main className="flex-1 flex py-1 pl-1 sm:p-2 gap-x-2 overflow-auto">
        <ProductosGrid productos={filteredProductos} />
        <VentaUI clientes={filteredClientes} />
      </main>
    );
  }
}
