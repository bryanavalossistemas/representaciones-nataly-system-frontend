import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libs/Utils";
import useComprasStore from "@/stores/ComprasStore";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function BotonSeleccionarProveedor({ proveedores }) {
  const [open, setOpen] = useState(false);
  const proveedorId = useComprasStore((state) => state.proveedorId);
  const setProveedorId = useComprasStore((state) => state.setProveedorId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("flex-1", !proveedorId && "text-muted-foreground")}
        >
          {proveedorId
            ? proveedores.find((proveedor) => proveedor.id === proveedorId)
                ?.nombre
            : "Seleccionar proveedor"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[526px] p-0">
        <Command>
          <CommandInput placeholder="Buscar proveedor..." className="h-9" />
          <CommandEmpty>No se encontró ningún proveedor</CommandEmpty>
          <CommandGroup className="overflow-auto h-[232px]">
            {proveedores.map((proveedor) => (
              <CommandItem
                key={proveedor.id}
                defaultValue={proveedor.id}
                onSelect={() => {
                  setProveedorId(proveedor.id);
                  setOpen(false);
                }}
              >
                {proveedor.nombre}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    proveedor.id === proveedorId ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
