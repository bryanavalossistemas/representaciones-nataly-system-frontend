import clienteService from "@/services/ClienteService";
import { useQuery } from "@tanstack/react-query";
import Cabecera from "./components/Cabecera";
import Tabla from "./components/Tabla";

export default function ClientesJuridicosView() {
  const { data: clientes, isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: clienteService.getAll,
  });

  if (isLoading) return "Cargando...";

  if (clientes) {
    return (
      <main className="flex-grow flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
        <Cabecera />
        <Tabla clientes={clientes} />
      </main>
    );
  }
}
