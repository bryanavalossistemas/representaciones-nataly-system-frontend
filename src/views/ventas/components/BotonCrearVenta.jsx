import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ventaService from "@/services/VentaService";
import useVentasStore from "@/stores/ventasStore";
import formatCurrency from "@/utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BotonCrearDetalleVenta from "./BotonCrearDetalleVenta";
import BotonEditarDetalleVenta from "./BotonEditarDetalleVenta";
import BotonSeleccionarClienteJuridico from "./BotonSeleccionarCliente";

export default function BotonCrearVenta({ productos, clientes }) {
  const [open, setOpen] = useState(false);
  const detallesVenta = useVentasStore((state) => state.detallesVenta);
  const clienteId = useVentasStore((state) => state.clienteId);
  const resetVenta = useVentasStore((state) => state.resetVenta);
  const deleteDetalleVenta = useVentasStore(
    (state) => state.deleteDetalleVenta
  );
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ventaService.create,
    onError: () => {
      setOpen(false);
      toast.error("No se pudo crear la venta");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      setOpen(false);
      toast.success("Venta creada correctamente");
    },
  });

  const handleCreateCompra = () => {
    let error = false;
    if (!clienteId) {
      toast.error("📋 Por favor, selecciona un cliente para continuar! 😊");
      error = true;
    }
    if (!(detallesVenta.length > 0)) {
      toast.error(
        "🛒 No olvides agregar el detalle de la venta para continuar. 😊"
      );
      error = true;
    }
    if (!error) mutate({ payload: { clienteId, detallesVenta } });
  };

  return (
    <>
      <Button
        className="flex gap-x-1"
        onClick={() => {
          resetVenta();
          setOpen(true);
        }}
      >
        <PlusCircle className="h-5 w-5" />
        <span className="font-semibold">Crear Venta</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-4xl`}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Crear Venta
            </DialogTitle>
            <DialogDescription className="text-center">
              Haga clic en guardar cuando haya terminado.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-x-2">
            {/* BOTON DE SELECCIONAR PROVEEDOR */}
            <BotonSeleccionarClienteJuridico clientes={clientes} />
            {/* BOTON DE CREAR DETALLE */}
            <BotonCrearDetalleVenta productos={productos} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Precio Venta</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Utilidad</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detallesVenta.map((detalleVenta) => (
                <TableRow className="font-medium" key={detalleVenta.id}>
                  <TableCell>{detalleVenta.nombreProducto}</TableCell>
                  <TableCell className="text-center">
                    {detalleVenta.cantidad}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(detalleVenta.precioVenta)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(
                      detalleVenta.cantidad * detalleVenta.precioVenta
                    )}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(detalleVenta.utilidad)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-1 justify-end">
                      <div className="hidden sm:block">
                        <BotonEditarDetalleVenta
                          detalleVenta={detalleVenta}
                          productos={productos}
                        />
                      </div>
                      <Button
                        className="px-2 sm:px-4 sm:gap-x-1"
                        onClick={() => {
                          deleteDetalleVenta(detalleVenta.id);
                          toast.success(
                            "Detalle de venta eliminado correctamente"
                          );
                        }}
                      >
                        <Trash className="w-5 h-5" />
                        <span className="hidden sm:block">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <div className="flex flex-col gap-y-2 sm:flex-row-reverse sm:gap-x-2">
              <Button disabled={isPending} onClick={handleCreateCompra}>
                Agregar
              </Button>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
