import formatCurrency from "@/utils/formatCurrency";
import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";

function columnas({ categorias, marcas }) {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      header: "Imagen",
      cell: ({ row }) => (
        <div className="flex max-w-20">
          <img
            className="object-contain object-center rounded-sm"
            src={row.original.imagenesProducto[0]?.url || "/placeholder.jpg"}
            alt={`imagen de ${row.getValue("nombre")}`}
          />
        </div>
      ),
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => row.getValue("nombre"),
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
      cell: ({ row }) => (
        <p className="max-w-44 overflow-hidden">
          {row.getValue("descripcion")}
        </p>
      ),
    },
    {
      accessorKey: "precioCosto",
      header: "Precio Costo",
      cell: ({ row }) => formatCurrency(row.getValue("precioCosto")),
    },
    {
      accessorKey: "precioVenta",
      header: "Precio Venta",
      cell: ({ row }) => formatCurrency(row.getValue("precioVenta")),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => row.getValue("stock"),
    },
    {
      accessorKey: "categoria",
      header: "Categoría",
      cell: ({ row }) => row.getValue("categoria"),
    },
    {
      accessorKey: "marca",
      header: "Marca",
      cell: ({ row }) => row.getValue("marca"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex gap-x-1 justify-end">
            <div className="hidden sm:block">
              <BotonEditar
                producto={row.original}
                categorias={categorias}
                marcas={marcas}
              />
            </div>
            <BotonEliminar producto={row.original} />
          </div>
        );
      },
    },
  ];
}

export default columnas;
