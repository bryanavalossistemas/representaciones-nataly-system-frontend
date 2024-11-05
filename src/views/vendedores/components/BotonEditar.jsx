import BotonEditarUi from "@/components/ui/BotonEditar";
import vendedorService from "@/services/VendedorService";
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
    username: data.username,
    password: data.password,
    dni: data.dni,
    telefono: data.telefono || "",
    celular: data.celular || "",
    correo: data.correo || "",
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        username: z.string().min(1, { message: "El usuario es requerido" }),
        password: z.string().min(1, { message: "La contraseña es requerida" }),
        dni: z.string().regex(/^\d{8}$/, "El dni debe tener 8 dígitos"),
        telefono: z
          .string()
          .regex(/^(\d{7})?$/, "El teléfono debe tener 7 dígitos"),
        celular: z
          .string()
          .regex(/^(\d{9})?$/, "El celular debe tener 9 dígitos"),
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
    mutationFn: vendedorService.update,
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
      queryClient.invalidateQueries({ queryKey: ["vendedores"] });
      setOpen(false);
      toast.success("Vendedor actualizado correctamente");
    },
  });

  const handleEditar = (formData) =>
    mutate({ id: data.id, payload: formFilter(formData) });

  return (
    <BotonEditarUi
      recurso={"vendedor"}
      formulario={formulario}
      CamposFormulario={<CamposFormulario formulario={formulario} />}
      handleEditar={handleEditar}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
    />
  );
}
