import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";

const columnas = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "nombreUsuario",
    header: "Nombre",
    cell: ({ row }) => row.getValue("nombreUsuario"),
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }) => formatDate(row.getValue("fecha")),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => formatCurrency(row.getValue("total")),
  },
  {
    accessorKey: "estaPagado",
    header: <div className="text-center">Está pagado?</div>,
    cell: ({ row }) =>
      row.getValue("estaPagado") ? (
        <button
          className="w-full text-center text-white bg-emerald-500 py-2 px-4 rounded-sm"
          onClick={async () => {
            try {
              const response = await fetch(
                import.meta.env.VITE_API_URL + `/ordenes/${row.getValue("id")}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              window.location.reload();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Pagado
        </button>
      ) : (
        <button
          className="w-full text-center text-white bg-red-500 py-2 px-4 rounded-sm"
          onClick={async () => {
            try {
              const response = await fetch(
                import.meta.env.VITE_API_URL + `/ordenes/${row.getValue("id")}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              window.location.reload();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Pendiente
        </button>
      ),
  },
];

export default columnas;
