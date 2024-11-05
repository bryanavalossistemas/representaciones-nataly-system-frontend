import { actualizarVendedor } from "@/apis/VendedorAPI";
import BotonEditarUi from "@/components/ui/BotonEditar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";
import formFilter from "@/utils/formFilter";

export default function BotonEditar({ vendedor }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: vendedor.nombre,
    username: vendedor.username,
    password: vendedor.password,
    dni: vendedor.dni,
    telefono: vendedor.telefono || "",
    celular: vendedor.celular || "",
    correo: vendedor.correo || "",
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().regex(/^.+$/, "El nombre del vendedor es requerido"),
        username: z
          .string()
          .regex(/^.+$/, "El usuario del vendedor es requerido"),
        password: z
          .string()
          .regex(/^.+$/, "La contraseña del vendedor es requerida"),
        dni: z
          .string()
          .regex(/^\d{8}$/, "El dni del vendedor debe tener 8 dígitos"),
        telefono: z
          .string()
          .regex(/^(\d{7})?$/, "El teléfono del vendedor debe tener 7 dígitos")
          .optional(),
        celular: z
          .string()
          .regex(/^(\d{9})?$/, "El celular del vendedor debe tener 9 dígitos")
          .optional(),
        correo: z
          .string()
          .regex(
            /^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "El correo del vendedor no es válido"
          )
          .optional(),
      })
    ),
    values: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: actualizarVendedor,
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

  const handleEditar = (datosFormulario) =>
    mutate({ datosFormulario: formFilter(datosFormulario), id: vendedor.id });

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
