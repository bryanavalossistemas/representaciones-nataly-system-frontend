import CarritoVenta from "./CarritoVenta";

export default function VentaUI({ clientes }) {
  return (
    <div className="sm:basis-1/4">
      <CarritoVenta clientes={clientes} />
    </div>
  );
}
