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
import useVentasStore from "@/stores/ventasStore";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function BotonSeleccionarCliente({ clientes }) {
  const [open, setOpen] = useState(false);
  const clienteId = useVentasStore((state) => state.clienteId);
  const setClienteId = useVentasStore(
    (state) => state.setClienteId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "flex-1",
            !clienteId && "text-muted-foreground"
          )}
        >
          {clienteId
            ? clientes.find(
                (cliente) => cliente.id === clienteId
              )?.nombre
            : "Seleccionar cliente"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[526px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente ..." className="h-9" />
          <CommandEmpty>No se encontró ningún cliente</CommandEmpty>
          <CommandGroup className="overflow-auto h-[232px]">
            {clientes.map((cliente) => (
              <CommandItem
                key={cliente.id}
                defaultValue={cliente.id}
                onSelect={() => {
                  setClienteId(cliente.id);
                  setOpen(false);
                }}
              >
                {cliente.nombre}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    cliente.id === clienteId
                      ? "opacity-100"
                      : "opacity-0"
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
