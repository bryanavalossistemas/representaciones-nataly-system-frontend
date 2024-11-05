import BotonEliminarUi from "@/components/ui/BotonEliminar";
import productoService from "@/services/ProductoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminar({ producto }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: productoService.delete,
    onError: () => {
      toast.error("No se pudo eliminar el producto");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      toast.success("Producto eliminado correctamente");
    },
  });

  return (
    <>
      <BotonEliminarUi
        action={() => mutate({ id: producto.id })}
        isPending={isPending}
      />
    </>
  );
}
