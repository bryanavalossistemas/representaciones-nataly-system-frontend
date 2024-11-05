function formFilter(datos) {
  const datosFiltrados = Object.fromEntries(
    Object.entries(datos).filter(([_, value]) => value !== "")
  );

  return datosFiltrados;
}

export default formFilter;
