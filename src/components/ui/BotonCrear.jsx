import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

export default function BotonCrear({
  recurso,
  formulario,
  handleCrear,
  CamposFormulario,
  open,
  setOpen,
  isPending,
  className,
}) {
  return (
    <>
      <Button
        type="button"
        className="flex gap-x-1"
        onClick={() => {
          setOpen(true);
          formulario.reset();
        }}
      >
        <PlusCircle className="h-5 w-5" />
        <span className="font-semibold">Crear {recurso}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-md ${className}`}>
          <DialogHeader>
            <DialogTitle>Crear {recurso}</DialogTitle>
            <DialogDescription>
              Haga clic en guardar cuando haya terminado.
            </DialogDescription>
          </DialogHeader>
          <Form {...formulario}>
            <form
              className="space-y-4"
              onSubmit={formulario.handleSubmit(handleCrear)}
            >
              <div className="space-y-2">{CamposFormulario}</div>
              <div className="flex justify-end gap-x-2">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  Guardar
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
