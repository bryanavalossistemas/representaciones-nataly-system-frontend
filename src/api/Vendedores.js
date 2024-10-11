import base from "./Base.js";

const endpoint = "vendedores";

const obtenerTodosLosVendedores = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearVendedor = async (payload) => await base.post(endpoint, payload);

const api = { crearVendedor, obtenerTodosLosVendedores, findOne };

export default api;
