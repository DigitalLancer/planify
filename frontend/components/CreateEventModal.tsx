"use client";
import { useEffect, useState, SubmitEvent } from "react";
import { useModal } from "@/context/ModalContext";
import { X } from "lucide-react";
import { Category } from "@/types/event";
import ModalCombobox from "./form/ModalCombobox";
import { submitEventForm } from "@/actions";

export default function CreateEventModal() {
  const wobblyBorder = "rounded-[255px_25px_225px_25px/25px_225px_25px_255px]";
  const { isOpen, closeModal } = useModal();
  const [category, setCategory] = useState<Category | "">("");

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl bg-stone-50 p-8 shadow-2xl border-2 border-slate-900/10 rounded-2xl transition-all">

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
        >
          <X size={24} />
        </button>
        <div className="mb-8 font-serif">
          <h2 className="relative inline-block text-3xl font-handwriting text-slate-800">
            <span className={`
      absolute 
      -top-2 /* Üstten 8px yukarı taşırdık */
      -left-4 -right-4 /* Yanlardan daha fazla pay verdik */
      h-11 /* Yüksekliği 36px'den 44px'e çıkardık */
      bg-indigo-200/60 
      z-0 
      -rotate-1 
      rounded-[6px_15px_4px_12px] 
      skew-x-[-12deg] 
      transform-gpu
    `}></span>

            <span className="relative z-10 px-2 leading-none">
              Add New Event
            </span>
          </h2>

          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-3 ml-1">
            Ready to plan?
          </p>
        </div>

        <form className="space-y-6" action={submitEventForm}>
          {/* Etkinlik Başlığı */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-xl text-slate-600">Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="What are we doing?"
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-handwriting text-xl transition-all"
            />
          </div>

          {/* Kategori Seçimi */}
          <div className="space-y-1 font-serif">
            <ModalCombobox value={category} onChange={setCategory} />
          </div>

          {/* Zaman Seçimi */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-xl text-slate-600">Date & Time</label>
            <input
              name="startDate"
              type="datetime-local"
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-mono text-sm text-slate-700 transition-all"
            />
          </div>

          {/* Açıklama */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-xl text-slate-600">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Add some details..."
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-handwriting text-xl resize-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              className={`bg-indigo-500/90 text-white px-6 py-2 font-handwriting md:text-xl shadow-md transition-all hover:scale-110 hover:-rotate-2 active:scale-95 cursor-pointer ${wobblyBorder}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}