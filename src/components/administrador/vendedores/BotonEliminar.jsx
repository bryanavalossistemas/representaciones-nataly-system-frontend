import { eliminarVendedor } from "@/apis/VendedorAPI";
import BotonEliminarUi from "@/components/ui/BotonEliminar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminar({ vendedor }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: eliminarVendedor,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendedores"] });
      toast.success("Vendedor eliminado correctamente");
    },
  });

  return (
    <>
      <BotonEliminarUi
        action={() => mutate({ id: vendedor.id })}
        isPending={isPending}
      />
    </>
  );
}
