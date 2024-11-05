import { create } from "zustand";
import { persist } from "zustand/middleware";

const useComprasStore = create()(
  persist(
    (set, get) => ({
      detallesVenta: [],

      clienteId: null,

      setDetallesVenta: (detallesVenta) => {
        set({ detallesVenta: detallesVenta });
      },

      setClienteId: (clienteId) => {
        set({ clienteId: clienteId });
      },

      createDetalleVenta: (detalleVenta) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = [...detallesVenta, detalleVenta];

        set({ detallesVenta: detallesVentaActualizado });
      },

      deleteDetalleVenta: (id) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.filter(
          (detalleVenta) => detalleVenta.id !== id
        );

        set({ detallesVenta: detallesVentaActualizado });
      },

      aumentarCantidadDetalleVenta: (id) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, cantidad: detalleVenta.cantidad + 1 }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      disminuirCantidadDetalleVenta: (id) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, cantidad: detalleVenta.cantidad - 1 }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      cambiarCantidadDetalleVenta: (id, cantidad) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, cantidad }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      cambiarPrecioVentaDetalleVenta: (id, precioVenta) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) => {
          return detalleVenta.id === id
            ? { ...detalleVenta, precioVenta }
            : detalleVenta;
        });

        set({ detallesVenta: detallesVentaActualizado });
      },

      updateDetalleVenta: ({ id, newDetalleVenta }) => {
        const { detallesVenta } = get();
        const detallesVentaActualizado = detallesVenta.map((detalleVenta) =>
          detalleVenta.id === id ? { ...newDetalleVenta, id } : detalleVenta
        );

        set({ detallesVenta: detallesVentaActualizado });
      },

      resetVenta: () => {
        set({ detallesVenta: [], clienteId: null });
      },
    }),
    { name: "rn-system-detalles-venta-store" }
  )
);

export default useComprasStore;
