import BotonCrearUi from "@/components/ui/BotonCrear";
import marcaService from "@/services/MarcaService";
import formFilter from "@/utils/formFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonCrear() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = { nombre: "" };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
      })
    ),
    defaultValues: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: marcaService.create,
    onError: (error) => {
      if (error.response?.data?.errors) {
        const errores = error.response.data.errors;
        errores.forEach((error) => {
          formulario.setError(error.path, {
            type: "manual",
            message: error.message,
          });
        });
        return;
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      formulario.reset();
      queryClient.invalidateQueries({ queryKey: ["marcas"] });
      setOpen(false);
      toast.success("Marca creada correctamente");
    },
  });

  const handleCrear = (formData) => mutate({ payload: formFilter(formData) });

  return (
    <BotonCrearUi
      recurso={"marca"}
      formulario={formulario}
      CamposFormulario={<CamposFormulario formulario={formulario} />}
      handleCrear={handleCrear}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
    />
  );
}
