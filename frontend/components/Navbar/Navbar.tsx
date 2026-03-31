"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import Image from "next/image";
import DefaultProfilePic from "@/public/default-profile.png"
import { useMe } from "@/hooks/useUser";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function VerticalNavbar() {
  const pathname = usePathname();
  const mutation = useLogout();
  const { data, isPending } = useMe();

  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { label: "Dashboard", href: "/dashboard", activeColor: "bg-blue-500" },
    { label: "Events List", href: "/eventlist", activeColor: "bg-rose-500" },
    { label: "Profile", href: "/settings", activeColor: "bg-emerald-500" },
  ];

  return (
    <>
      <button className="bg-[#264b88] md:hidden fixed top-4 left-4 z-50 p-2 rounded-2xl text-white cursor-pointer" onClick={() => setIsOpen(true)}>
        <Menu size={18} />
      </button>
      {isOpen && (
        <>
          {/* overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* drawer */}
          <aside className="fixed top-0 left-0 h-full w-64 bg-[#264b88] z-100 py-10 md:hidden">
            <nav className="flex flex-col items-center text-center gap-10 w-full h-full">
              <div className="w-full flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1e293b] font-handwriting text-2xl border-1 border-white">
                  <Image src={DefaultProfilePic} alt="Profile picture" width={160} height={160}></Image>
                </div>
                <h1 className="text-white mt-1">{data ? data.username : ""}</h1>
              </div>

              <div className="flex flex-col items-center">
                {menu.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group my-2 transition-all duration-300" >
                      <span className={`relative z-20 font-handwriting transition-colors ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                        {item.label}
                      </span>

                      {active && (
                        <div className="absolute right-0 w-1 h-6 bg-black/20 rounded-full z-20 mr-2" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => mutation.mutate()}
                className='transition-all duration-300 cursor-pointer'>
                <span className="relative z-20 font-handwriting text-slate-100 group-hover:text-white flex items-center gap-2">
                  <LogOut size={24} />
                </span>
              </button>

            </nav>
          </aside>
        </>
      )}



      {/* Sidebar */}
      <aside id="sidebar" className="bg-[#264b88] hidden md:flex flex-col h-full w-40 pt-10 relative overflow-visible shadow-[4px_0_15px_rgba(0,0,0,0.1)]">
        <nav className="flex flex-col gap-8 w-full">
          {/*Profil*/}
          <div className="w-full flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#1e293b] font-handwriting text-2xl border-2 border-white">
              <Image src={DefaultProfilePic} alt="Profile picture" width={160} height={160}></Image>
            </div>
            <h1 className="text-white mt-1">{data ? data.username : ""}</h1>
          </div>

          {/* Middle Section */}
          <div>
            {menu.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                relative font-serif group flex items-center my-2 py-3 pl-6 transition-all duration-300 ${active ? 'translate-x-2' : 'hover:translate-x-1'}`}
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
          </div>


          <button
            onClick={() => mutation.mutate()}
            className={`
      relative font-serif group flex items-center pl-6 transition-all duration-300
      hover:translate-x-1 w-full text-left cursor-pointer
    `}
          >
            <span className="relative z-20 font-handwriting text-slate-100 group-hover:text-white flex items-center gap-2">
              <LogOut size={24} />
            </span>
          </button>
        </nav>

      </aside>
    </>

  );
}