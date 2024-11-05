import api from "@/libs/Axios";

class MarcaService {
  async create({ payload }) {
    const { data } = await api.post("/marcas", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/marcas");

    const marcas = respuesta.data;

    return marcas;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/marcas/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/marcas/${id}`);

    return data;
  }
}

export default new MarcaService();
