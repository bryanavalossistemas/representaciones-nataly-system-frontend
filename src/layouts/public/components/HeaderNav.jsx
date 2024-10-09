import HeaderNavItem from "./HeaderNavItem";

const navItems = [
  {
    id: 1,
    href: "#",
    label: "Nosotros",
  },
  {
    id: 2,
    href: "#",
    label: "Contacto",
  },
  {
    id: 3,
    href: "#",
    label: "Acreedores",
  },
];

export default function HeaderNav() {
  return (
    <div className="flex-1 flex justify-center gap-x-16 text-white text-sm font-semibold">
      {navItems.map((navItem) => (
        <HeaderNavItem key={navItem.id} navItem={navItem} />
      ))}
    </div>
  );
}
