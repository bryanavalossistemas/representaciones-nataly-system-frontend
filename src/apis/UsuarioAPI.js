import api from "@/libs/Axios";
import { jwtDecode } from "jwt-decode";

export async function iniciarSesion(datosFormulario) {
  const ruta = "/auth/login";
  const { data } = await api.post(ruta, datosFormulario);
  const token = data.token;
  const decodedToken = jwtDecode(data.token);
  const rolId = decodedToken.rolId;
  const nombre = decodedToken.nombre;
  return { token, rolId, nombre };
}

export async function obtenerUsuario() {
  const { data: respuesta } = await api.get("/auth/usuario");

  return respuesta.data;
}
