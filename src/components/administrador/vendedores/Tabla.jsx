import TablaUi from "@/components/ui/Tabla";
import { columnas } from "@/components/administrador/vendedores/Columnas";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import BotonCrear from "./BotonCrear";

export default function Tabla({ vendedores }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 4 });

  const tabla = useReactTable({
    data: vendedores,
    columns: columnas,
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
      placeholder={"Buscar vendedor..."}
      BotonCrear={<BotonCrear />}
    />
  );
}
