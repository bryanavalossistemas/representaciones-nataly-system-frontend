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
import compraService from "@/services/CompraService";
import useComprasStore from "@/stores/ComprasStore";
import formatCurrency from "@/utils/formatCurrency";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import BotonCrearDetalleCompra from "./BotonCrearDetalleCompra";
import BotonEditarDetalleCompra from "./BotonEditarDetalleCompra";
import BotonSeleccionarProveedor from "./BotonSeleccionarProveedor";

export default function BotonEditarCompra({ data, productos, proveedores }) {
  const [open, setOpen] = useState(false);
  const detallesCompra = useComprasStore((state) => state.detallesCompra);
  const setProveedorId = useComprasStore((state) => state.setProveedorId);
  const setDetallesCompra = useComprasStore((state) => state.setDetallesCompra);
  const proveedorId = useComprasStore((state) => state.proveedorId);
  const deleteDetalleCompra = useComprasStore(
    (state) => state.deleteDetalleCompra
  );
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: compraService.update,
    onError: (error) => {
      setOpen(false);
      toast.error("No se pudo actualizar la compra");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["compras"] });
      setOpen(false);
      toast.success("Compra actualizada correctamente");
    },
  });

  const handleUpdateCompra = () => {
    let error = false;
    if (!proveedorId) {
      toast.error("📋 Por favor, selecciona un proveedor para continuar! 😊");
      error = true;
    }
    if (!(detallesCompra.length > 0)) {
      toast.error(
        "🛒 No olvides agregar el detalle de la compra para continuar. 😊"
      );
      error = true;
    }
    if (!error)
      mutate({
        id: data.id,
        payload: { proveedorId, newDetallesCompra: detallesCompra },
      });
  };

  return (
    <>
      <Button
        className="flex gap-x-1"
        onClick={() => {
          setProveedorId(data.proveedorId);
          setDetallesCompra(data.detallesCompra);
          setOpen(true);
        }}
      >
        <Pen className="h-5 w-5" />
        <span className="font-semibold">Editar</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-4xl`}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Editar Compra
            </DialogTitle>
            <DialogDescription className="text-center">
              Haga clic en guardar cuando haya terminado.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-x-2">
            {/* BOTON DE SELECCIONAR PROVEEDOR */}
            <BotonSeleccionarProveedor proveedores={proveedores} />
            {/* BOTON DE CREAR DETALLE */}
            <BotonCrearDetalleCompra productos={productos} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead className="text-center">Cantidad</TableHead>
                <TableHead className="text-right">Costo</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {detallesCompra.map((detalleCompra) => (
                <TableRow className="font-medium" key={detalleCompra.id}>
                  <TableCell>{detalleCompra.nombreProducto}</TableCell>
                  <TableCell className="text-center">
                    {detalleCompra.cantidad}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(detalleCompra.precioCosto)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(
                      detalleCompra.cantidad * detalleCompra.precioCosto
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-1 justify-end">
                      <div className="hidden sm:block">
                        <BotonEditarDetalleCompra
                          detalleCompra={detalleCompra}
                          productos={productos}
                        />
                      </div>
                      <Button
                        className="px-2 sm:px-4 sm:gap-x-1"
                        onClick={() => {
                          deleteDetalleCompra(detalleCompra.id);
                          toast.success(
                            "Detalle de compra eliminado correctamente"
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
              <Button disabled={isPending} onClick={handleUpdateCompra}>
                Guardar
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
