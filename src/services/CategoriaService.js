import api from "@/libs/Axios";

class CategoriaService {
  async create({ payload }) {
    const { data } = await api.post("/categorias", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/categorias");

    const categorias = respuesta.data;

    return categorias;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/categorias/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/categorias/${id}`);

    return data;
  }
}

export default new CategoriaService();
