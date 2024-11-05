import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
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
  handleEditar,
  CamposFormulario,
  open,
  setOpen,
  isPending,
  className,
}) {
  return (
    <>
      <Button className="flex gap-x-1" onClick={() => setOpen(true)}>
        <Pen className="h-5 w-5" />
        <span className="font-semibold">Editar</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-md ${className}`}>
          <DialogHeader>
            <DialogTitle>Editar {recurso}</DialogTitle>
            <DialogDescription>
              Haga clic en guardar cuando haya terminado.
            </DialogDescription>
          </DialogHeader>
          <Form {...formulario}>
            <form
              className="space-y-4"
              onSubmit={formulario.handleSubmit(handleEditar)}
            >
              <div className="space-y-2">{CamposFormulario}</div>
              <div className="flex justify-end gap-x-2">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
                <Button disabled={isPending} type="submit">
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
