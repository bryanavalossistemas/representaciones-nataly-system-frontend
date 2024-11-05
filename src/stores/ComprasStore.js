import { create } from "zustand";
import { persist } from "zustand/middleware";

const useComprasStore = create()(
  persist(
    (set, get) => ({
      detallesCompra: [],

      proveedorId: null,

      setDetallesCompra: (detallesCompra) => {
        set({ detallesCompra: detallesCompra });
      },

      setProveedorId: (proveedorId) => {
        set({ proveedorId: proveedorId });
      },

      createDetalleCompra: (detalleCompra) => {
        const { detallesCompra } = get();
        const detallesCompraActualizado = [...detallesCompra, detalleCompra];

        set({ detallesCompra: detallesCompraActualizado });
      },

      deleteDetalleCompra: (id) => {
        const { detallesCompra } = get();
        const detallesCompraActualizado = detallesCompra.filter(
          (detalleCompra) => detalleCompra.id !== id
        );

        set({ detallesCompra: detallesCompraActualizado });
      },

      updateDetalleCompra: ({ id, newDetalleCompra }) => {
        const { detallesCompra } = get();
        const detallesCompraActualizado = detallesCompra.map((detalleCompra) =>
          detalleCompra.id === id ? { ...newDetalleCompra, id } : detalleCompra
        );

        set({ detallesCompra: detallesCompraActualizado });
      },

      resetCompra: () => {
        set({ detallesCompra: [], proveedorId: null });
      },
    }),
    { name: "rn-system-detalles-compra-store" }
  )
);

export default useComprasStore;
