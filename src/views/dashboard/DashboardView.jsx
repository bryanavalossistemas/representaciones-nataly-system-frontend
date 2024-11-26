import ProductoService from "@/services/ProductoService";
import GraficoDeBarras from "./components/GraficoDeBarras";
import { useQuery } from "@tanstack/react-query";
import GraficoDePastel from "./components/GraficoDePastel";

export default function DashboardView() {
  const { data: productos } = useQuery({
    queryKey: ["productosMasVendidos"],
    queryFn: ProductoService.getAllMasVendidos,
  });

  if (productos) {
    return (
      <main className="flex-grow flex items-center justify-center">
        {/* <GraficoDeBarras /> */}
        <GraficoDePastel productos={productos} />
      </main>
    );
  }
}
