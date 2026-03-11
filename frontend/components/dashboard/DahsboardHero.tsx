"use client"
import { useModal } from "@/context/ModalContext";

const wobblyBorder = "rounded-[255px_25px_225px_25px/25px_225px_25px_255px]";

function DashboardHero() {
  const { openModal } = useModal()

  return (
    <div className={`relative w-full h-55 overflow-hidden bg-white border-2 border-slate-900/10 ${wobblyBorder} shadow-sm group`}>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -right-20 w-100 h-100 bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply group-hover:bg-purple-300/40 transition-colors duration-700" />
        <div className="absolute -bottom-20 -left-10 w-[350px] h-[350px] bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sketch-lines" width="40" height="40" patternUnits="userSpaceOnUse" rotate="15">
              <line x1="0" y1="0" x2="40" y2="40" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="0" x2="50" y2="40" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sketch-lines)" />
        </svg>
      </div>

      {/* İçerik */}
      <div className="relative z-10 w-full h-full p-10 flex flex-col justify-center">
        <div className="space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">Personal Planner • Vol. 01</p>

          <h1 className="text-2xl md:text-5xl font-handwriting text-slate-800 leading-tight">
            Welcome back, <span className="relative">
              John Doe
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-yellow-300/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 2, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="max-w-md text-slate-500 font-serif italic text-sm mt-3 md:visible hidden">
            "Your mind is for having ideas, not holding them."
          </p>
        </div>

        <button
          onClick={openModal}
          className={`
          absolute bottom-8 right-10 
          bg-indigo-500/90 text-white 
          px-6 py-2 font-handwriting md:text-xl
          shadow-md transition-all 
          hover:scale-110 hover:-rotate-2 active:scale-95
          cursor-pointer
          ${wobblyBorder}
        `}>
          + Quick add event
          <div className="absolute top-1 left-1 w-2 h-2 bg-white/20 rounded-full" />
        </button>
      </div>
    </div>
  )
}

export default DashboardHero