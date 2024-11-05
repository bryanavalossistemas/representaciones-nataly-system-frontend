import BotonEditarUi from "@/components/ui/BotonEditar";
import clienteNaturalService from "@/services/ClienteNaturalService";
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

  const valoresIniciales = {
    nombre: data.nombre,
    dni: data.dni,
    direccion: data.direccion || "",
    celular: data.celular || "",
    correo: data.correo || "",
  };

  const formulario = useForm({
    resolver: zodResolver({
      nombre: z.string().min(1, { message: "El nombre es requerido" }),
      dni: z.string().regex(/^\d{8}$/, "El dni debe contener 8 dígitos"),
      direccion: z.string(),
      celular: z
        .string()
        .regex(/^(\d{9})?$/, "El celular debe contener 9 dígitos"),
      correo: z
        .string()
        .regex(
          /^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
          "El correo no es válido"
        ),
    }),
    values: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: clienteNaturalService.update,
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
      queryClient.invalidateQueries({ queryKey: ["clientesNaturales"] });
      setOpen(false);
      toast.success("Cliente natural actualizado correctamente");
    },
  });

  const handleEditar = (formData) =>
    mutate({ id: data.id, payload: formFilter(formData) });

  return (
    <BotonEditarUi
      recurso={"cliente natural"}
      formulario={formulario}
      CamposFormulario={<CamposFormulario formulario={formulario} />}
      handleEditar={handleEditar}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
    />
  );
}
