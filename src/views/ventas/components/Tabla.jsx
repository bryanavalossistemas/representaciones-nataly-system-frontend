import TablaUi from "@/components/ui/Tabla";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import BotonCrearVenta from "./BotonCrearVenta";
import BotonEditarVenta from "./BotonEditarVenta";
import BotonEliminarVenta from "./BotonEliminarVenta";
import formatDate from "@/utils/formatDate";
import formatCurrency from "@/utils/formatCurrency";

export default function Tabla({ data, productos, clientes }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "nombreCliente",
      header: "Cliente",
      cell: ({ row }) => row.getValue("nombreCliente"),
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
        <div className="text-right">
          {formatCurrency(row.getValue("total"))}
        </div>
      ),
    },
    {
      accessorKey: "utilidad",
      header: () => <div className="text-right">Utilidad</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {formatCurrency(row.getValue("utilidad"))}
        </div>
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
              <BotonEditarVenta
                data={row.original}
                productos={productos}
                clientes={clientes}
              />
            </div>
            <BotonEliminarVenta data={row.original} />
          </div>
        );
      },
    },
  ];

  const tabla = useReactTable({
    data,
    columns,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
    },
  });

  return (
    <TablaUi
      tabla={tabla}
      placeholder={"Buscar venta ..."}
      BotonCrear={<BotonCrearVenta productos={productos} clientes={clientes} />}
    />
  );
}
