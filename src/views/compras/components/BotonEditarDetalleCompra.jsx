import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libs/Utils";
import useComprasStore from "@/stores/ComprasStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Pen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function BotonEditarDetalleCompra({ detalleCompra, productos }) {
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const updateDetalleCompra = useComprasStore(
    (state) => state.updateDetalleCompra
  );

  const valoresIniciales = {
    productoId: detalleCompra.productoId,
    cantidad: detalleCompra.cantidad,
    precioCosto: detalleCompra.precioCosto,
    nombreProducto: detalleCompra.nombreProducto,
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        productoId: z.coerce
          .number()
          .positive({ message: "⚠️ ¡Por favor! Selecciona una producto." }),
        cantidad: z.coerce
          .number()
          .int({
            message: "🌟 ¡Casi listo! Ingresa un número entero, por favor. 😊",
          })
          .positive({ message: "⚠️ ¡Atención! La cantidad es obligatorio." }),
        precioCosto: z.coerce.number().positive({
          message: "⚠️ ¡Atención! El precio de costo es obligatorio.",
        }),
        nombreProducto: z.string(),
      })
    ),
    values: valoresIniciales,
  });

  const handleUpdateDetalleCompra = (newDetalleCompra) => {
    const nombreProducto = productos.find(
      (producto) => producto.id === newDetalleCompra.productoId
    )?.nombre;
    updateDetalleCompra({
      id: detalleCompra.id,
      newDetalleCompra: { ...newDetalleCompra, nombreProducto },
    });
    setOpen(false);
    toast.success("Detalle de compra actualizado correctamente");
  };

  return (
    <>
      <Button
        className="flex gap-x-1"
        onClick={() => {
          formulario.reset();
          setOpen(true);
        }}
      >
        <Pen className="h-5 w-5" />
        <span className="font-semibold">Editar</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              Editar Detalle de Compra
            </DialogTitle>
            <DialogDescription className="text-center">
              Haga clic en guardar cuando haya terminado.
            </DialogDescription>
          </DialogHeader>
          <Form {...formulario}>
            <form
              className="space-y-4"
              onSubmit={formulario.handleSubmit(handleUpdateDetalleCompra)}
            >
              <div className="space-y-2">
                <FormField
                  control={formulario.control}
                  name="productoId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Producto</FormLabel>
                      <Popover open={openPopover} onOpenChange={setOpenPopover}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? productos.find(
                                    (producto) => producto.id === field.value
                                  )?.nombre
                                : "Seleccionar producto"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[398px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Buscar producto ..."
                              className="h-9"
                            />
                            <CommandEmpty>
                              No se encontró ningún producto
                            </CommandEmpty>
                            <CommandGroup className="overflow-auto h-[232px]">
                              {productos.map((producto) => (
                                <CommandItem
                                  key={producto.id}
                                  defaultValue={producto.id}
                                  onSelect={() => {
                                    formulario.setValue(
                                      "productoId",
                                      producto.id
                                    );
                                    formulario.setValue(
                                      "nombreProducto",
                                      producto.nombre
                                    );
                                    setOpenPopover(false);
                                  }}
                                >
                                  {producto.nombre}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      producto.id === field.value
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="cantidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="precioCosto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Costo</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="150.50"
                          min="0"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-x-2">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit">Guardar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
