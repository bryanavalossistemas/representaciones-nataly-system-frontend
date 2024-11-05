import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";

export default function Factura({ venta, xd }) {
  return (
    <div ref={xd} className="content-print text-sm mb-1">
      <div className="flex justify-between">
        <div className="text-left flex flex-col justify-between">
          <h2 className="text-xl font-bold">Factura N°: {venta.id}</h2>
          <div>
            <h3 className="text-lg font-semibold">Cliente</h3>
            <p>{venta.cliente.nombre}</p>
            <p>{venta.cliente.telefono}</p>
          </div>
          <p className="text-sm capitalize">{formatDate(venta.fecha)}</p>
        </div>
        <img src="/logo.png" alt="Logo de la empresa" className="w-32" />
      </div>

      <table className="min-w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b text-left">Descripción</th>
            <th className="py-2 px-4 border-b text-left">Cantidad</th>
            <th className="py-2 px-4 border-b text-left">Precio</th>
            <th className="py-2 px-4 border-b text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {venta.detallesVenta.map((detalle, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{detalle.producto.nombre}</td>
              <td className="py-2 px-4 border-b text-center">
                {detalle.cantidad}
              </td>
              <td className="py-2 px-4 border-b text-right">
                {formatCurrency(detalle.precioVenta)}
              </td>
              <td className="py-2 px-4 border-b text-right">
                {formatCurrency(detalle.precioVenta * detalle.cantidad)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatCurrency(venta.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>IGV (18%):</span>
          <span>{formatCurrency(venta.igv)}</span>
        </div>
        <div className="flex justify-between font-bold mt-2">
          <span>Total:</span>
          <span>{formatCurrency(venta.total)}</span>
        </div>
      </div>
    </div>
  );
}
