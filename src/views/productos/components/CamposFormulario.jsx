import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/libs/Utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export default function CamposFormulario({ formulario, categorias, marcas }) {
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopover2, setOpenPopover2] = useState(false);

  const imagenesProducto = formulario.watch("imagenesProducto");
  const nuevasImagenesProducto = formulario.watch("nuevasImagenesProducto");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesWithPreviews = files.map((file) => ({
      preview: URL.createObjectURL(file),
      file,
    }));
    formulario.setValue("nuevasImagenesProducto", [
      ...nuevasImagenesProducto,
      ...imagesWithPreviews,
    ]);
  };

  const handleDeleteNewImage = (previewUrl) => {
    const updatedNewImages = nuevasImagenesProducto.filter(
      (image) => image.preview !== previewUrl
    );
    const imageToRemove = nuevasImagenesProducto.find(
      (image) => image.preview === previewUrl
    );
    if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);
    formulario.setValue("nuevasImagenesProducto", updatedNewImages);
  };

  const handleDeleteImage = (imageId) => {
    formulario.setValue(
      "imagenesProducto",
      imagenesProducto.map((img) =>
        img.id === imageId ? { ...img, toDelete: true } : img
      )
    );
  };

  return (
    <div className="flex gap-x-5">
      <div className="flex-1 space-y-2">
        <FormField
          control={formulario.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Harina Anita x 50 Kg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formulario.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Harina de trigo de la marca anita"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formulario.control}
          name="precioCosto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio Costo</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="150.50"
                  min="0"
                  step="0.01"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formulario.control}
          name="precioVenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio Venta</FormLabel>
              <FormControl>
                <Input type="number" placeholder="175.50" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formulario.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formulario.control}
          name="categoriaId"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Categoría</FormLabel>
              <Popover open={openPopover} onOpenChange={setOpenPopover} modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categorias.find(
                            (categoria) => categoria.id === field.value
                          )?.nombre
                        : "Seleccionar categoría"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[526px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Buscar categoría..."
                      className="h-9"
                    />
                    <CommandEmpty>
                      No se encontró ninguna categoría
                    </CommandEmpty>
                    <CommandGroup className="overflow-auto h-[232px]">
                      <CommandItem
                        defaultValue={""}
                        onSelect={() => {
                          formulario.setValue("categoriaId", "");
                          setOpenPopover(false);
                        }}
                      >
                        {"Seleccionar categoría"}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === "" ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      {categorias.map((categoria) => (
                        <CommandItem
                          key={categoria.id}
                          defaultValue={categoria.id}
                          onSelect={() => {
                            formulario.setValue("categoriaId", categoria.id);
                            setOpenPopover(false);
                          }}
                        >
                          {categoria.nombre}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              categoria.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formulario.control}
          name="marcaId"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Marca</FormLabel>
              <Popover open={openPopover2} onOpenChange={setOpenPopover2}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? marcas.find((marca) => marca.id === field.value)
                            ?.nombre
                        : "Seleccionar marca"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[526px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Buscar marca..."
                      className="h-9"
                    />
                    <CommandEmpty>No se encontró ninguna marca</CommandEmpty>
                    <CommandGroup className="overflow-auto h-[232px]">
                      <CommandItem
                        defaultValue={""}
                        onSelect={() => {
                          formulario.setValue("marcaId", "");
                          setOpenPopover2(false);
                        }}
                      >
                        {"Seleccionar marca"}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === "" ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      {marcas.map((marca) => (
                        <CommandItem
                          key={marca.id}
                          defaultValue={marca.id}
                          onSelect={() => {
                            formulario.setValue("marcaId", marca.id);
                            setOpenPopover2(false);
                          }}
                        >
                          {marca.nombre}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              marca.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex-1 flex flex-col gap-y-5">
        <div className="flex-1 grid grid-cols-2 gap-1">
          {imagenesProducto
            .filter((img) => !img.toDelete)
            .map((img) => (
              <div
                className="w-full aspect-square text-center space-y-1"
                key={img.id}
              >
                <div className="h-full flex items-center">
                  <img
                    className="h-full object-contain"
                    src={img.url}
                    alt="product"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteImage(img.id)}
                >
                  Eliminar
                </Button>
              </div>
            ))}
          {nuevasImagenesProducto.map((image, index) => (
            <div
              className="w-full aspect-square text-center space-y-1"
              key={index}
            >
              <div className="h-full flex items-center">
                <img
                  className="h-full object-contain"
                  src={image.preview}
                  alt={`Preview ${index}`}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDeleteNewImage(image.preview)}
              >
                Eliminar
              </Button>
            </div>
          ))}
          {nuevasImagenesProducto.length === 0 &&
            imagenesProducto.length === 0 && (
              <img
                className="col-span-2 place-self-center"
                src="/placeholder.jpg"
                alt={`placeholder`}
              />
            )}
        </div>
        <div className="flex justify-center">
          <label
            className="bg-teal-600 px-3 py-1.5 rounded-sm text-white text-sm font-medium hover:cursor-pointer hover:bg-teal-500"
            htmlFor="imgs"
          >
            Agregar Imágenes
          </label>
          <input
            onChange={handleFileChange}
            id="imgs"
            type="file"
            accept="image/*"
            className="hidden"
            multiple
          />
        </div>
        {formulario.formState.errors.nuevasImagenesProducto && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {formulario.formState.errors.nuevasImagenesProducto.message}
          </p>
        )}
        {formulario.formState.errors.imagenesProducto && (
          <p className="text-[0.8rem] font-medium text-destructive">
            {formulario.formState.errors.imagenesProducto.message}
          </p>
        )}
      </div>
    </div>
  );
}
