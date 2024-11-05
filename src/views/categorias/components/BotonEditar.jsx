import BotonEditarUi from "@/components/ui/BotonEditar";
import categoriaService from "@/services/CategoriaService";
import formFilter from "@/utils/formFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonEditar({ data }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = { nombre: data.nombre };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
      })
    ),
    values: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: categoriaService.update,
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
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      setOpen(false);
      toast.success("Categoría actualizada correctamente");
    },
  });

  const handleEditar = (formData) =>
    mutate({ id: data.id, payload: formFilter(formData) });

  return (
    <BotonEditarUi
      recurso={"categoría"}
      formulario={formulario}
      CamposFormulario={<CamposFormulario formulario={formulario} />}
      handleEditar={handleEditar}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
    />
  );
}
