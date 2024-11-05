import api from "@/libs/Axios";

class CompraService {
  async create({ payload }) {
    const { data } = await api.post("/compras", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/compras");

    const compras = respuesta.data;

    return compras;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/compras/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/compras/${id}`);

    return data;
  }
}

export default new CompraService();
