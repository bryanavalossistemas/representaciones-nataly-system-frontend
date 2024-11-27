import api from "@/libs/Axios";

class OrdenService {
  async getAll() {
    const { data: respuesta } = await api.get("/ordenes/all");

    return respuesta.data;
  }
}

export default new OrdenService();
