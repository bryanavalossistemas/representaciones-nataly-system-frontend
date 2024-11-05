import api from "@/libs/Axios";

export async function obtenerVendedores() {
  const { data: respuesta } = await api.get("/vendedores");

  const vendedores = respuesta.data.map((vendedor) => {
    return {
      ...vendedor,
      nombre: vendedor.usuario.nombre,
      username: vendedor.usuario.username,
      password: vendedor.usuario.password,
    };
  });

  return vendedores;
}

export async function crearVendedor({ datosFormulario }) {
  const { data } = await api.post("/vendedores", datosFormulario);

  return data;
}

export async function actualizarVendedor({ id, datosFormulario }) {
  const { data } = await api.put(`/vendedores/${id}`, datosFormulario);

  return data;
}

export async function eliminarVendedor({ id }) {
  const { data } = await api.delete(`/vendedores/${id}`);

  return data;
}
