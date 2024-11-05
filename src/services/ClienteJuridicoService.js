import api from "@/libs/Axios";

class ClienteJuridicoService {
  async create({ payload }) {
    const { data } = await api.post("/clientesJuridicos", payload);

    return data;
  }

  async getAll() {
    const { data: respuesta } = await api.get("/clientesJuridicos");

    const clientesJuridicos = respuesta.data.map((clienteJuridico) => {
      return {
        ...clienteJuridico,
        nombre: clienteJuridico.cliente.nombre,
        direccion: clienteJuridico.cliente.direccion,
        celular: clienteJuridico.cliente.celular,
        correo: clienteJuridico.cliente.correo,
      };
    });

    return clientesJuridicos;
  }

  async update({ id, payload }) {
    const { data } = await api.put(`/clientesJuridicos/${id}`, payload);

    return data;
  }

  async delete({ id }) {
    const { data } = await api.delete(`/clientesJuridicos/${id}`);

    return data;
  }
}

export default new ClienteJuridicoService();
