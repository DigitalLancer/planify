"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css"

export default function VerticalNavbar() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Events List", href: "/eventlist" },
    { label: "Calendar View", href: "/licenses" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <aside id="sidebar" className="bg-[#8B5CF6] px-3 py-8 text-white hidden md:block h-full w-35 text-center font-semibold">
      <div className="w-full flex justify-center mb-5">
        <div className="logo w-10 h-10 rounded-3xl bg-gray-100"></div>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}