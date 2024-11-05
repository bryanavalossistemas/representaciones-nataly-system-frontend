function formatCurrency(amount) {
  return amount.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
}

export default formatCurrency;
