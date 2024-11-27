import BotonEliminarUi from "@/components/ui/BotonEliminar";
import vendedorService from "@/services/VendedorService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminar({ data }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: vendedorService.delete,
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
        action={() => mutate({ id: data.id })}
        isPending={isPending}
      />
    </>
  );
}
