import { cn } from "@/libs/Utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useMemo, useState } from "react";
import DetalleVenta from "./DetalleVenta";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import useVentasStore from "@/stores/ventasStore";
import BotonCrearVenta from "./BotonCrearVenta";
import formatCurrency from "@/utils/formatCurrency";

export default function CarritoVenta({ clientes }) {
  const [open, setOpen] = useState(false);
  const clienteId = useVentasStore((state) => state.clienteId);
  const setClienteId = useVentasStore((state) => state.setClienteId);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const detallesVenta = useVentasStore((state) => state.detallesVenta);
  const resetVenta = useVentasStore((state) => state.resetVenta);

  const total = useMemo(
    () =>
      detallesVenta.reduce(
        (total, detalleVenta) =>
          total + detalleVenta.precioVenta * detalleVenta.cantidad,
        0
      ),
    [detallesVenta]
  );

  const subtotal = useMemo(() => total / 1.18, [detallesVenta]);

  const igv = useMemo(() => subtotal * 0.18, [detallesVenta]);

  async function handleClick() {
    if (detallesVenta.length === 0) {
      toast.error("Debe agregar a lo menos un detalle de venta");
      return;
    }
    if (cliente.id <= 0) {
      toast.error("Debe seleccionar un cliente");
      return;
    }
    const response = await createSale(detallesVenta, cliente);
    if (!response?.error) {
      resetVenta();
      toast.success("Venta creada correctamente");
    } else {
      toast.error(response.error.message);
    }
  }

  return (
    <>
      <div
        className={cn(
          "fixed sm:static right-0 flex flex-col h-full z-50 w-[90%] transition-all sm:w-full",
          mostrarCarrito ? "top-0 delay-300" : "-top-full"
        )}
      >
        <Card className="flex flex-col gap-y-2 h-full p-2 bg-background rounded-none sm:rounded-md">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(!clienteId && "text-muted-foreground")}
              >
                {clienteId
                  ? clientes.find((cliente) => cliente.id === clienteId)?.nombre
                  : "Seleccionar cliente"}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Command>
                <CommandInput
                  placeholder="Buscar cliente ..."
                  className="h-9"
                />
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
                          cliente.id === clienteId ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <ul className="overflow-y-auto flex flex-col gap-y-2 pr-2">
            {detallesVenta.map((detalleVenta) => (
              <DetalleVenta key={detalleVenta.id} detalleVenta={detalleVenta} />
            ))}
          </ul>

          <div className="flex flex-col gap-y-2 pr-2 mt-auto text-sm">
            <ul className="flex flex-col gap-y-2">
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <h3 className="font-bold">{formatCurrency(subtotal)}</h3>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">IGV (18%)</p>
                <h3 className="font-bold">{formatCurrency(igv)}</h3>
              </li>
              <li className="flex items-center justify-between">
                <p className="text-muted-foreground">Total</p>
                <h3 className="font-bold">{formatCurrency(total)}</h3>
              </li>
            </ul>
            <BotonCrearVenta />
          </div>
        </Card>
      </div>
    </>
  );
}
