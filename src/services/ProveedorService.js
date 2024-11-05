import api from "@/libs/Axios";

class ProveedorService {
  async create({ payload }) {
    const { data } = await api.post("/proveedores", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/proveedores");

    const proveedores = respuesta.data;

    return proveedores;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/proveedores/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/proveedores/${id}`);

    return data;
  }
}

export default new ProveedorService();
