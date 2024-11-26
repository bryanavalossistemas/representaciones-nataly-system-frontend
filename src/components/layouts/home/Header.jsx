import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  iniciarSesion,
  iniciarSesionGoogle,
  obtenerUsuario,
} from "@/apis/UsuarioAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAutenticacionStore } from "@/stores/AutenticacionStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GoogleLogin } from "@react-oauth/google";

const elementos = [
  {
    id: 1,
    ruta: "#",
    etiqueta: "Nosotros",
  },
  {
    id: 2,
    ruta: "#",
    etiqueta: "Contacto",
  },
  {
    id: 3,
    ruta: "#",
    etiqueta: "Acreedores",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const setToken = useAutenticacionStore((state) => state.setToken);

  const valoresIniciales = {
    correo: "",
    contrasenia: "",
  };
  const formulario = useForm({
    resolver: zodResolver(
      z.object({
        correo: z.string().min(1, {
          message: "El nombre de usuario es requerido",
        }),
        contrasenia: z.string().min(1, {
          message: "La contraseña es requerida",
        }),
      })
    ),
    defaultValues: valoresIniciales,
  });

  const { mutate: mutateGoogle, isPendingGoogle } = useMutation({
    mutationFn: iniciarSesionGoogle,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: ({ token, rolId, nombre }) => {
      setToken(token);
      if (rolId === 1) {
        navigate("/dashboard");
      } else if (rolId === 2) {
        navigate("/pos");
      } else {
        navigate("/");
      }
      toast.success(`Bienvenido ${nombre}`);
    },
  });

  const handleLogin = (credentialResponse) => {
    mutateGoogle({
      datosFormulario: { googleToken: credentialResponse.credential },
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: iniciarSesion,
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
    onSuccess: ({ token, rolId, nombre }) => {
      setToken(token);
      if (rolId === 1) {
        navigate("/dashboard");
      } else if (rolId === 2) {
        navigate("/pos");
      } else {
        navigate("/");
      }
      toast.success(`Bienvenido ${nombre}`);
    },
  });

  const handleIniciarSesion = (datosFormulario) => mutate(datosFormulario);

  async function verificarSesion() {
    try {
      const usuario = await obtenerUsuario();
      if (usuario.rolId === 1) {
        navigate("/dashboard");
      } else if (usuario.rolId === 2) {
        navigate("/pos");
      } else {
        navigate("/");
      }
    } catch (error) {
      formulario.reset();
      setOpen(true);
    }
  }

  return (
    <header className="h-14 flex items-center justify-between px-8 bg-teal-400">
      <Link
        to={"/"}
        className="font-extrabold text-2xl text-white transform hover:scale-110 transition duration-150"
      >
        R&N
      </Link>
      <nav className="flex gap-x-16">
        {elementos.map((elemento) => (
          <Link
            key={elemento.id}
            to={elemento.ruta}
            className="text-white text-sm font-semibold hover:underline"
          >
            {elemento.etiqueta}
          </Link>
        ))}
      </nav>
      <Button className="bg-red-500 hover:bg-red-600" onClick={verificarSesion}>
        Ingresar al sistema
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Iniciar sesión</DialogTitle>
            <DialogDescription>
              Ingresa tus credenciales para ingresar a R&N System
            </DialogDescription>
          </DialogHeader>
          <Form {...formulario}>
            <form
              className="space-y-4"
              onSubmit={formulario.handleSubmit(handleIniciarSesion)}
            >
              <div className="space-y-2">
                <FormField
                  control={formulario.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nombre de correo"
                          {...field}
                          autoComplete="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formulario.control}
                  name="contrasenia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contraseña"
                          {...field}
                          type="password"
                          autoComplete="current-password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isPending || isPendingGoogle}
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                Ingresar
              </Button>
            </form>
          </Form>
          <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log("Error en la autenticación")}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
