import { Card } from "@/components/ui/card";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import BarraDeBusqueda from "./BarraDeBusqueda";
import ListaDeProductos from "./ListaDeProductos";

export default function ProductosGrid({ productos }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const columns = [
    {
      accessorKey: "nombre",
    },
    {
      accessorKey: "descripcion",
    },
    {
      accessorKey: "categoria",
    },
    {
      accessorKey: "marca",
    },
  ];

  const tabla = useReactTable({
    data: productos,
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
    <Card className="basis-4/4 pr-1 p-1 sm:p-2 rounded-md sm:basis-3/4 flex flex-col gap-y-1 sm:gap-y-2">
      <BarraDeBusqueda tabla={tabla} />
      <div className="overflow-y-auto">
        <ListaDeProductos tabla={tabla} />
      </div>
    </Card>
  );
}
