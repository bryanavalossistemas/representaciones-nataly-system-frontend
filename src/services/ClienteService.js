import api from "@/libs/Axios";

class ClienteService {
  async create({ payload }) {
    const { data } = await api.post("/clientes", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/clientes");

    const clientes = respuesta.data;

    return clientes;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/clientes/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/clientes/${id}`);

    return data;
  }
}

export default new ClienteService();
