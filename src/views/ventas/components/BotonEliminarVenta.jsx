import BotonEliminarUi from "@/components/ui/BotonEliminar";
import ventaService from "@/services/VentaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminarVenta({ data }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ventaService.delete,
    onError: () => {
      toast.error("No se pudo eliminar la venta");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ventas"] });
      toast.success("Venta eliminada correctamente");
    },
  });

  return (
    <>
      <BotonEliminarUi
        action={() => mutate({ id: data.id })}
        isPending={isPending}
      />
    </>
  );
}
