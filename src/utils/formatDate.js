function formatDate(date, locale = "es-PE") {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date(date));
}

export default formatDate;
