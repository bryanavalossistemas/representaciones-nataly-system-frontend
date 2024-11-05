import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function BarraDeBusqueda({ tabla }) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        id="search"
        className="pl-8"
        type="search"
        placeholder="Buscar productos ..."
        onChange={(event) => tabla.setGlobalFilter(event.target.value)}
        value={tabla.getState().globalFilter ?? ""}
      />
    </div>
  );
}
