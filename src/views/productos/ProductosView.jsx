import categoriaService from "@/services/CategoriaService";
import productoService from "@/services/ProductoService";
import { useQuery } from "@tanstack/react-query";
import Cabecera from "./components/Cabecera";
import Tabla from "./components/Tabla";
import marcaService from "@/services/MarcaService";

export default function ProductosView() {
  const { data: productos, isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: productoService.getAll,
    refetchOnWindowFocus: false,
  });

  const { data: categorias } = useQuery({
    queryKey: ["categorias"],
    queryFn: categoriaService.getAll,
  });

  const { data: marcas } = useQuery({
    queryKey: ["marcas"],
    queryFn: marcaService.getAll,
  });

  if (isLoading) return "Cargando...";

  if (productos && categorias && marcas) {
    const filteredProductos = productos.map((producto) => {
      return {
        ...producto,
        categoria: producto.categoria?.nombre,
        marca: producto.marca?.nombre,
        imagenesProducto: producto.imagenesProducto.map((img) => ({
          ...img,
          toDelete: false,
        })),
      };
    });

    return (
      <main className="flex-grow flex flex-col gap-y-1 sm:gap-y-2 p-1 sm:p-2">
        <Cabecera />
        <Tabla
          productos={filteredProductos}
          categorias={categorias}
          marcas={marcas}
        />
      </main>
    );
  }
}
