"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import Image from "next/image";
import DefaultProfilePic from "@/public/default-profile.png"
export default function VerticalNavbar() {
  const pathname = usePathname();
  const mutation = useLogout();

  const menu = [
    { label: "Dashboard", href: "/dashboard", activeColor: "bg-blue-500" },
    { label: "Events List", href: "/eventlist", activeColor: "bg-rose-500" },
    { label: "Settings", href: "/settings", activeColor: "bg-emerald-500" },
  ];

  return (
    <aside id="sidebar" className="bg-[#264b88] hidden md:flex flex-col h-full w-40 pt-10 relative overflow-visible shadow-[4px_0_15px_rgba(0,0,0,0.1)]">
      <div className="w-full flex justify-center mb-12">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1e293b] font-handwriting text-2xl border-2 border-white">
          <Image src={DefaultProfilePic} alt="Profile picture" width={160} height={160}></Image>
        </div>
      </div>

      <nav className="flex flex-col gap-5 w-full">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative font-serif group flex items-center py-3 pl-6 transition-all duration-300 ${active ? 'translate-x-2' : 'hover:translate-x-1'}`}
            >
              {active && (
                <div className={`
                  absolute right-[-10px] top-0 bottom-0 left-4 
                  ${item.activeColor} rounded-l-lg
                  shadow-[-4px_0_10px_rgba(0,0,0,0.2)]
                  z-10
                `} />
              )}

              <span className={`
                relative z-20 font-handwriting transition-colors
                ${active ? 'text-white' : 'text-slate-100 group-hover:text-white'}
              `}>
                {item.label}
              </span>

              {active && (
                <div className="absolute right-0 w-1 h-6 bg-black/20 rounded-full z-20 mr-2" />
              )}
            </Link>
          );
        })}

        <button
          onClick={() => mutation.mutate()}
          className={`
      relative font-serif group flex items-center py-3 pl-6 transition-all duration-300
      hover:translate-x-1 w-full text-left mt-1.5 cursor-pointer
    `}
        >
          <span className="relative z-20 font-handwriting text-slate-100 group-hover:text-white flex items-center gap-2">
            <LogOut size={24} />
          </span>
        </button>
      </nav>

    </aside>
  );
}