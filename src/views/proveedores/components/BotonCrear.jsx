import BotonCrearUi from "@/components/ui/BotonCrear";
import proveedorService from "@/services/ProveedorService";
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

  const valoresIniciales = {
    nombre: "",
    ruc: "",
    direccion: "",
    telefono: "",
    celular: "",
    correo: "",
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z.string().min(1, { message: "El nombre es requerido" }),
        ruc: z.string().regex(/^\d{11}$/, "El ruc debe contener 11 dígitos"),
        direccion: z.string(),
        telefono: z
          .string()
          .regex(/^(\d{7})?$/, "El teléfono debe contener 7 dígitos"),
        celular: z
          .string()
          .regex(/^(\d{9})?$/, "El celular debe contener 9 dígitos"),
        correo: z
          .string()
          .regex(
            /^$|^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "El correo no es válido"
          ),
      })
    ),
    defaultValues: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: proveedorService.create,
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
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
      setOpen(false);
      toast.success("Proveedor creado correctamente");
    },
  });

  const handleCrear = (formData) => mutate({ payload: formFilter(formData) });

  return (
    <BotonCrearUi
      recurso={"proveedor"}
      formulario={formulario}
      CamposFormulario={<CamposFormulario formulario={formulario} />}
      handleCrear={handleCrear}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
    />
  );
}
