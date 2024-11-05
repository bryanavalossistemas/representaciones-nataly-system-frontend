import BotonEditarUi from "@/components/ui/BotonEditar";
import clienteService from "@/services/ClienteService";
import formFilter from "@/utils/formFilter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonEditar({ cliente }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: cliente.nombre,
    ruc: cliente.ruc,
    direccion: cliente.direccion || "",
    celular: cliente.celular || "",
    telefono: cliente.telefono || "",
    correo: cliente.correo || "",
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        ruc: z.string().regex(/^\d{11}$/, "El ruc debe contener 11 dígitos"),
        direccion: z.string(),
        celular: z
          .string()
          .regex(/^(\d{9})?$/, "El celular debe contener 9 dígitos"),
        telefono: z
          .string()
          .regex(/^(\d{7})?$/, "El teléfono debe contener 7 dígitos"),
        correo: z
          .string()
          .regex(
            /^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "El correo no es válido"
          ),
      })
    ),
    values: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: clienteService.update,
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
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      setOpen(false);
      toast.success("Cliente actualizado correctamente");
    },
  });

  const handleEditar = (formData) =>
    mutate({ id: cliente.id, payload: formFilter(formData) });

  return (
    <BotonEditarUi
      recurso={"cliente"}
      formulario={formulario}
      CamposFormulario={<CamposFormulario formulario={formulario} />}
      handleEditar={handleEditar}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
    />
  );
}
