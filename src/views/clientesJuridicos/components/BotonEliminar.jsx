import BotonEliminarUi from "@/components/ui/BotonEliminar";
import clienteJuridicoService from "@/services/ClienteJuridicoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminar({ data }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: clienteJuridicoService.delete,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientesJuridicos"] });
      toast.success("Cliente jurídico eliminado correctamente");
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
