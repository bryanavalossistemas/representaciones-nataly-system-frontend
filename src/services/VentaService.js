import api from "@/libs/Axios";

class VentaService {
  async create({ payload }) {
    const { data: respuesta } = await api.post("/ventas", payload);

    return respuesta.data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/ventas");

    const ventas = respuesta.data;

    return ventas;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/ventas/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/ventas/${id}`);

    return data;
  }
}

export default new VentaService();
