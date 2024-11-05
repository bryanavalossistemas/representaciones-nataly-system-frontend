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
            <FormLabel>Nombre del vendedor</FormLabel>
            <FormControl>
              <Input placeholder="Bryan Avalos Loa y Pardo Jesus" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre de usuario</FormLabel>
            <FormControl>
              <Input placeholder="goku123" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contraseña del vendedor</FormLabel>
            <FormControl>
              <Input placeholder="********" {...field} type="password" />
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
            <FormLabel>DNI del vendedor</FormLabel>
            <FormControl>
              <Input placeholder="75013015" {...field} type="number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={formulario.control}
        name="telefono"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Teléfono del vendedor</FormLabel>
            <FormControl>
              <Input placeholder="4746922" {...field} type="number" />
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
            <FormLabel>Celular del vendedor</FormLabel>
            <FormControl>
              <Input placeholder="915115894" {...field} type="number" />
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
            <FormLabel>Correo del vendedor</FormLabel>
            <FormControl>
              <Input placeholder="correo@correo.com" {...field} type="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
