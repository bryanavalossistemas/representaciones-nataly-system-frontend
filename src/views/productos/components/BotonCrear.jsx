import BotonCrearUi from "@/components/ui/BotonCrear";
import productoService from "@/services/ProductoService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonCrear({ categorias, marcas }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: "",
    descripcion: "",
    precioCosto: "",
    precioVenta: "",
    stock: "",
    categoriaId: "",
    marcaId: "",
    imagenesProducto: [],
    nuevasImagenesProducto: [],
  };

  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        nombre: z
          .string()
          .min(1, { message: "⚠️ ¡Atención! El nombre es obligatorio." }),
        descripcion: z
          .string()
          .min(1, { message: "⚠️ ¡Atención! La descripción es obligatoria." }),
        precioCosto: z.coerce.number().positive({
          message: "⚠️ ¡Atención! El precio de costo es obligatorio.",
        }),
        precioVenta: z.coerce.number().positive({
          message: "⚠️ ¡Atención! El precio de venta es obligatorio.",
        }),
        stock: z.coerce
          .number()
          .int({
            message: "🌟 ¡Casi listo! Ingresa un número entero, por favor. 😊",
          })
          .positive({ message: "⚠️ ¡Atención! El stock es obligatorio." }),
        categoriaId: z.coerce.number(),
        marcaId: z.coerce.number(),
        imagenesProducto: z.array(
          z.object({
            id: z.coerce.number(),
            url: z.string().url(),
            toDelete: z.boolean().optional(),
          })
        ),
        nuevasImagenesProducto: z
          .array(
            z.object({
              preview: z.string().url("La URL de la imagen debe ser válida"),
              file: z.instanceof(File, "Debe ser un archivo de tipo File"),
            })
          )
          .min(2, "📷 ¡Atención! Debe escoger 2 imágenes, por favor."),
      })
    ),
    defaultValues: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: productoService.create,
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
      console.error(error);
    },
    onSuccess: () => {
      formulario.reset();
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setOpen(false);
      toast.success("Producto creado correctamente");
    },
  });

  const handleCrear = (data) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("precioCosto", data.precioCosto);
    formData.append("precioVenta", data.precioVenta);
    formData.append("stock", data.stock);
    if (data.categoriaId !== 0) {
      formData.append("categoriaId", data.categoriaId);
    }
    if (data.marcaId !== 0) {
      formData.append("marcaId", data.marcaId);
    }
    data.nuevasImagenesProducto.forEach((nuevaImagenProducto) => {
      formData.append("imagenes", nuevaImagenProducto.file);
    });
    mutate({ payload: formData });
  };

  return (
    <BotonCrearUi
      recurso={"producto"}
      formulario={formulario}
      CamposFormulario={
        <CamposFormulario
          formulario={formulario}
          categorias={categorias}
          marcas={marcas}
        />
      }
      handleCrear={handleCrear}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      className={"max-w-4xl"}
    />
  );
}
