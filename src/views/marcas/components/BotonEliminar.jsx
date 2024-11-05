import BotonEliminarUi from "@/components/ui/BotonEliminar";
import marcaService from "@/services/MarcaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function BotonEliminar({ data }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: marcaService.delete,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
      toast.success("Marca eliminada correctamente");
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
