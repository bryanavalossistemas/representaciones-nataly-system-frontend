import BotonEditarUi from "@/components/ui/BotonEditar";
import productoService from "@/services/ProductoService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CamposFormulario from "./CamposFormulario";

export default function BotonEditar({ producto, categorias, marcas }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const valoresIniciales = {
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precioCosto: producto.precioCosto,
    precioVenta: producto.precioVenta,
    stock: producto.stock,
    categoriaId: producto.categoriaId,
    marcaId: producto.marcaId,
    imagenesProducto: producto.imagenesProducto,
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
        nuevasImagenesProducto: z.array(
          z.object({
            preview: z.string().url("La URL de la imagen debe ser válida"),
            file: z.instanceof(File, "Debe ser un archivo de tipo File"),
          })
        ),
      })
    ),
    values: valoresIniciales,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: productoService.update,
    onError: (error) => {
      console.error(error);

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
    },
    onSuccess: () => {
      formulario.reset();
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setOpen(false);
      toast.success("Producto actualizado correctamente");
    },
  });

  const validateMinimumImages = (quantity) => {
    const activeExistingImages = formulario
      .getValues("imagenesProducto")
      .filter((img) => !img.toDelete).length;
    const totalImages =
      activeExistingImages +
      formulario.getValues("nuevasImagenesProducto").length;
    return totalImages >= quantity;
  };

  const handleEditar = (data) => {
    if (!validateMinimumImages(2)) {
      formulario.setError("imagenesProducto", {
        type: "manual",
        message: "📷 ¡Atención! Debes tener al menos 2 imágenes del producto.",
      });
      return;
    }
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
    formData.append("imagenesProducto", JSON.stringify(data.imagenesProducto));
    data.nuevasImagenesProducto.forEach((nuevaImagenProducto) => {
      formData.append("imagenes", nuevaImagenProducto.file);
    });
    mutate({ id: producto.id, payload: formData });
  };
  return (
    <BotonEditarUi
      recurso={"producto"}
      formulario={formulario}
      CamposFormulario={
        <CamposFormulario
          formulario={formulario}
          categorias={categorias}
          marcas={marcas}
        />
      }
      handleEditar={handleEditar}
      open={open}
      setOpen={setOpen}
      isPending={isPending}
      className={"max-w-4xl"}
    />
  );
}
