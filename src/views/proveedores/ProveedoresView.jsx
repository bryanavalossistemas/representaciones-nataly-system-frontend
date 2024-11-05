import proveedorService from "@/services/ProveedorService";
import { useQuery } from "@tanstack/react-query";
import Cabecera from "./components/Cabecera";
import Tabla from "./components/Tabla";

export default function ProveedoresView() {
  const { data, isLoading } = useQuery({
    queryKey: ["proveedores"],
    queryFn: proveedorService.getAll,
  });

  if (isLoading) return "Cargando...";

  if (data) {
    return (
      <main className="flex-grow flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
        <Cabecera />
        <Tabla data={data} />
      </main>
    );
  }
}
