import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeLayout from "@/layouts/home/HomeLayout";
import HomeView from "@/views/home/HomeView";

import AppLayout from "@/layouts/app/AppLayout";
import DashboardView from "@/views/dashboard/DashboardView";
import VendedoresView from "@/views/vendedores/VendedoresView";
import ClientesView from "@/views/clientes/ClientesView";
import ClientesJuridicosView from "@/views/clientesJuridicos/ClientesJuridicosView";
import ClientesNaturalesView from "@/views/clientesNaturales/ClientesNaturalesView";
import ProveedoresView from "@/views/proveedores/ProveedoresView";
import CategoriasView from "@/views/categorias/CategoriasView";
import MarcasView from "@/views/marcas/MarcasView";
import ProductosView from "@/views/productos/ProductosView";
import ComprasView from "@/views/compras/ComprasView";
import VentasView from "@/views/ventas/VentasView";
import POSView from "@/views/pos/POSView";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomeView />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route
            path="/vendedores"
            element={
              <ProtectedRoute roles={[1]}>
                <VendedoresView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <ProtectedRoute roles={[1]}>
                <ClientesView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proveedores"
            element={
              <ProtectedRoute roles={[1]}>
                <ProveedoresView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <ProtectedRoute roles={[1]}>
                <CategoriasView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marcas"
            element={
              <ProtectedRoute roles={[1]}>
                <MarcasView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <ProtectedRoute roles={[1]}>
                <ProductosView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compras"
            element={
              <ProtectedRoute roles={[1]}>
                <ComprasView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas"
            element={
              <ProtectedRoute roles={[1]}>
                <VentasView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pos"
            element={
              <ProtectedRoute roles={[1, 2]}>
                <POSView />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
