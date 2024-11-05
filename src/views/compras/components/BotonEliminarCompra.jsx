import BotonEliminarUi from "@/components/ui/BotonEliminar";
import compraService from "@/services/CompraService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminarCompra({ data }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: compraService.delete,
    onError: () => {
      toast.error("No se pudo eliminar la compra");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["compras"] });
      toast.success("Compra eliminada correctamente");
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
