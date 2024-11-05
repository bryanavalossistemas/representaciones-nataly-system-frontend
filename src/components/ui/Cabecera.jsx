export default function Cabecera({ titulo, descripcion }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold sm:text-3xl">{titulo}</h1>
      <p className="text-muted-foreground text-sm hidden sm:block">
        {descripcion}
      </p>
    </div>
  );
}
