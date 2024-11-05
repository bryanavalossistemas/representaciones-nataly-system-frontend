import CabeceraUi from "@/components/ui/Cabecera";

export default function Cabecera() {
  return (
    <CabeceraUi
      titulo={"Compras"}
      descripcion={
        "Una página de gestión de compras es una herramienta digital diseñada para facilitar y optimizar el proceso de adquisición de productos y servicios dentro de una organización. Esta plataforma permite a los usuarios gestionar solicitudes de compra, llevar un seguimiento detallado de órdenes, proveedores y productos, y realizar análisis de gastos de manera eficiente. Con una interfaz intuitiva, los responsables de compras pueden visualizar el estado de cada transacción, administrar inventarios y controlar los plazos de entrega, lo cual ayuda a reducir costos y mejorar la relación con proveedores. Además, la integración de reportes y gráficos proporciona datos clave para la toma de decisiones estratégicas, promoviendo una gestión de recursos más transparente y efectiva."
      }
    />
  );
}
