import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";

const columnas = [
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
    accessorKey: "correo",
    header: "Correo",
    cell: ({ row }) => row.getValue("correo"),
  },
  {
    accessorKey: "contrasenia",
    header: "Contraseña",
    cell: ({ row }) => row.getValue("contrasenia"),
  },
  {
    accessorKey: "dni",
    header: "DNI",
    cell: ({ row }) => row.getValue("dni"),
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
