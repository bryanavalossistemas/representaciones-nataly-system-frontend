import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ventaService from "@/services/VentaService";
import useVentasStore from "@/stores/ventasStore";
import { useMutation } from "@tanstack/react-query";
import html2pdf from "html2pdf.js";
import { Printer } from "lucide-react";
import { useRef, useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { toast } from "sonner";
import Factura from "./Factura";

export default function BotonCrearVenta() {
  const detallesVenta = useVentasStore((state) => state.detallesVenta);
  const clienteId = useVentasStore((state) => state.clienteId);
  const resetVenta = useVentasStore((state) => state.resetVenta);
  const [open, setOpen] = useState(false);
  const [venta, setVenta] = useState(null);
  const componentRef = useRef();

  const { mutate, isPending } = useMutation({
    mutationFn: ventaService.create,
    onError: (error) => {
      console.log(error);
      toast.error("No se pudo crear la venta");
    },
    onSuccess: (data) => {
      resetVenta();
      setVenta(data);
      setOpen(true);
      toast.success("Venta creada correctamente");
    },
  });

  const handlePDF = () => {
    const element = componentRef.current;
    const options = {
      margin: 0.2,
      filename: "venta.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  async function handleCreateVenta() {
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
    if (!error)
      mutate({
        payload: {
          clienteId,
          detallesVenta: detallesVenta.map((detalleVenta) => {
            return {
              cantidad: detalleVenta.cantidad,
              precioVenta: detalleVenta.precioVenta,
              productoId: detalleVenta.producto.id,
            };
          }),
        },
      });
  }

  return (
    <>
      <Button
        className="h-10 transition-all text-sm"
        type="button"
        disabled={isPending}
        onClick={handleCreateVenta}
      >
        Confirmar Venta
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl dialog-content-print">
          <DialogHeader className="ocultar">
            <DialogTitle className="text-center text-xl">
              Factura de Venta
            </DialogTitle>
            <DialogDescription className="text-center">
              Imprime o guarda tu factura
            </DialogDescription>
          </DialogHeader>
          <Factura xd={componentRef} venta={venta} />
          <Button
            className="bg-blue-500 hover:bg-blue-600 flex items-center gap-x-1"
            onClick={() => window.print()}
          >
            <label>Imprimir</label>
            <Printer className="w-5 h-5" />
          </Button>
          <Button
            className="bg-green-500 hover:bg-green-600 flex items-center gap-x-1"
            onClick={handlePDF}
          >
            <label>PDF</label>
            <FaRegFilePdf className="w-5 h-5" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
