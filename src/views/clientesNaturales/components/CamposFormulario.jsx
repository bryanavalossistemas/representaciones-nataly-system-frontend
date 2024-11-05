import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function CamposFormulario({ formulario }) {
  return (
    <>
      <FormField
        control={formulario.control}
        name="nombre"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Bryan Avalos Loa y Pardo"
                {...field}
                autoComplete="name"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="dni"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DNI</FormLabel>
            <FormControl>
              <Input type="number" placeholder="75013015" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="direccion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dirección</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Av. Aviacion 721"
                {...field}
                autoComplete="street-address"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="celular"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Celular</FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="915115894"
                {...field}
                autoComplete="tel-national"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="correo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Correo</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="correo@correo.com"
                {...field}
                autoComplete="email"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
