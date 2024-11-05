export default function Footer() {
  return (
    <footer className="h-10 flex justify-center items-center bg-teal-400 text-sm">
      &copy; Todos los derechos reservados Ing. Software II -{" "}
      {new Date().getFullYear()}
    </footer>
  );
}
