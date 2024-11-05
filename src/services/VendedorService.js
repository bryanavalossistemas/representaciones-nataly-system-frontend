import api from "@/libs/Axios";

class VendedorService {
  async create({ payload }) {
    const { data } = await api.post("/vendedores", payload);

    return data;
  }

  async getAll() {
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

  async update({ id, payload }) {
    const { data } = await api.put(`/vendedores/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/vendedores/${id}`);

    return data;
  }
}

export default new VendedorService();
