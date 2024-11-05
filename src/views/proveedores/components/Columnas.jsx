import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";

export const columnas = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
    cell: ({ row }) => row.getValue("nombre"),
  },
  {
    accessorKey: "ruc",
    header: "RUC",
    cell: ({ row }) => row.getValue("ruc"),
  },
  {
    accessorKey: "direccion",
    header: "Direccion",
    cell: ({ row }) => row.getValue("direccion"),
  },
  {
    accessorKey: "telefono",
    header: "Teléfono",
    cell: ({ row }) => row.getValue("telefono"),
  },
  {
    accessorKey: "celular",
    header: "Celular",
    cell: ({ row }) => row.getValue("celular"),
  },
  {
    accessorKey: "correo",
    header: "Correo",
    cell: ({ row }) => row.getValue("correo"),
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
            <BotonEditar data={row.original} />
          </div>
          <BotonEliminar data={row.original} />
        </div>
      );
    },
  },
];

export default columnas;
