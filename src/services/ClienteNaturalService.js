import api from "@/libs/Axios";

class ClienteNaturalService {
  async create({ payload }) {
    const { data } = await api.post("/clientesNaturales", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/clientesNaturales");

    const clientesNaturales = respuesta.data.map((clienteNatural) => {
      return {
        ...clienteNatural,
        nombre: clienteNatural.cliente.nombre,
        direccion: clienteNatural.cliente.direccion,
        celular: clienteNatural.cliente.celular,
        correo: clienteNatural.cliente.correo,
      };
    });

    return clientesNaturales;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/clientesNaturales/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/clientesNaturales/${id}`);

    return data;
  }
}

export default new ClienteNaturalService();
