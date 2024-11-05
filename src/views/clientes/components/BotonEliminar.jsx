import BotonEliminarUi from "@/components/ui/BotonEliminar";
import clienteService from "@/services/ClienteService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminar({ cliente }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: clienteService.delete,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast.success("Cliente eliminado correctamente");
    },
  });

  return (
    <>
      <BotonEliminarUi
        action={() => mutate({ id: cliente.id })}
        isPending={isPending}
      />
    </>
  );
}
