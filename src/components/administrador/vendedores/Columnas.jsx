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
    accessorKey: "username",
    header: "Usuario",
    cell: ({ row }) => row.getValue("username"),
  },
  {
    accessorKey: "password",
    header: "Contraseña",
    cell: ({ row }) => row.getValue("password"),
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
            <BotonEditar
              vendedor={row.original}
            />
          </div>
          <BotonEliminar
            vendedor={row.original}
          />
        </div>
      );
    },
  },
];
