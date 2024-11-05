import TablaUi from "@/components/ui/Tabla";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import BotonCrear from "./BotonCrear";
import columns from "./Columnas";

export default function Tabla({ clientes }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const tabla = useReactTable({
    data: clientes,
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
      placeholder={"Buscar cliente ..."}
      BotonCrear={<BotonCrear />}
    />
  );
}
