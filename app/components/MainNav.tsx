"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
// import { Link } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`,
    },

    {
      href: `/sizes`,
      label: "Sizes",
      active: pathname === `/sizes`,
    },

    {
      href: `/rooms`,
      label: "Rooms",
      active: pathname === `/rooms`,
    },
    {
      href: `/reservations`,
      label: "Reservations",
      active: pathname === `/reservations`,
    },
    {
      href: `/settings`,
      label: "Settings",
      active: pathname === `/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-dark dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
