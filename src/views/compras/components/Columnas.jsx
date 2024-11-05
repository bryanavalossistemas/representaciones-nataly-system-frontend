import formatCurrency from "@/utils/formatCurrency";
import BotonEliminarCompra from "./BotonEliminarCompra";
import formatDate from "@/utils/formatDate";
import BotonEditarCompra from "./BotonEditarCompra";

export const columnas = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "nombreProveedor",
    header: "Proveedor",
    cell: ({ row }) => row.getValue("nombreProveedor"),
  },
  {
    accessorKey: "fecha",
    header: () => <div className="text-left">Fecha</div>,
    cell: ({ row }) => (
      <div className="text-left">{formatDate(row.getValue("fecha"))}</div>
    ),
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => (
      <div className="text-right">{formatCurrency(row.getValue("total"))}</div>
    ),
  },
  {
    id: "actions",
    header: () => {
      return <span className="flex justify-end"></span>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-x-1 justify-end">
          <div className="hidden sm:block">
            {/* <BotonEditarCompra
              compra={row.original}
              productos={productos}
              proveedores={proveedores}
            /> */}
          </div>
          <BotonEliminarCompra data={row.original} />
        </div>
      );
    },
  },
];

export default columnas;
