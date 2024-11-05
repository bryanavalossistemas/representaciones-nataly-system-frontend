import { Button } from "@/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenu as NavigationMenuWrapper,
} from "@/components/ui/navigation-menu";
import { cn } from "@/libs/Utils";
import { Link, useLocation } from "react-router-dom";

export default function NavigationMenuDesktop({ className, ...props }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className={cn("gap-x-3", className)} {...props}>
      <NavigationMenuWrapper>
        <NavigationMenuList>
          {/* DASHBOARD */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/dashboard">
                <Button
                  className={cn(
                    pathname.startsWith("/dashboard") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Dashboard
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* VENDEDORES */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/vendedores">
                <Button
                  className={cn(
                    pathname.startsWith("/vendedores") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Vendedores
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* CLIENTES */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/clientes">
                <Button
                  className={cn(
                    pathname.startsWith("/clientes") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Clientes
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* PROVEEDORES */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/proveedores">
                <Button
                  className={cn(
                    pathname.startsWith("/proveedor") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Proveedores
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* PRODUCTOS */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                (pathname.startsWith("/productos") ||
                  pathname.startsWith("/categorias") ||
                  pathname.startsWith("/marcas")) &&
                  "bg-accent text-accent-foreground"
              )}
            >
              Productos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/productos"
                  >
                    <div className="text-sm font-medium leading-none">
                      Productos
                    </div>
                    <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                      Explore una amplia gama de categorías de productos, que
                      satisfacen todas las necesidades y preferencias, en
                      nuestra página intuitiva diseñada para navegar y descubrir
                      sin esfuerzo.
                    </p>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/categorias"
                  >
                    <div className="text-sm font-medium leading-none">
                      Categorías
                    </div>
                    <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                      Explore una amplia gama de categorías de productos, que
                      satisfacen todas las necesidades y preferencias, en
                      nuestra página intuitiva diseñada para navegar y descubrir
                      sin esfuerzo.
                    </p>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    to="/marcas"
                  >
                    <div className="text-sm font-medium leading-none">
                      Marcas
                    </div>
                    <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                      Explore una amplia gama de marcas de productos, que
                      satisfacen todas las necesidades y preferencias, en
                      nuestra página intuitiva diseñada para navegar y descubrir
                      sin esfuerzo.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* COMPRAS */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/compras">
                <Button
                  className={cn(
                    pathname.startsWith("/compras") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Compras
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* VENTAS */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/ventas">
                <Button
                  className={cn(
                    pathname.startsWith("/ventas") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  Ventas
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* POS */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/pos">
                <Button
                  className={cn(
                    pathname.startsWith("/pos") &&
                      "bg-accent text-accent-foreground"
                  )}
                  variant="ghost"
                >
                  POS
                </Button>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuWrapper>
    </div>
  );
}
