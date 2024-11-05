import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAutenticacionStore = create()(
  persist(
    (set, get) => ({
      token: null,

      setToken: (token) => {
        set(() => ({
          token: token,
        }));
      },
    }),
    { name: "rn-system-autenticacion-store" }
  )
);
