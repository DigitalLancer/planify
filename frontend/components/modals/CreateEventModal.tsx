"use client";
import { useEffect, useState, SubmitEvent } from "react";
import { useModal } from "@/context/ModalContext";
import { X } from "lucide-react";
import { Category } from "@/types/event";
import ModalCombobox from "../form/ModalCombobox";
import { useAddEvent } from "@/hooks/useEvents";


export default function CreateEventModal() {
  const wobblyBorder = "rounded-[255px_25px_225px_25px/25px_225px_25px_255px]";
  const { modal, closeModal } = useModal();

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<Category | "">("");
  const [startDate, setStartDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")

  const { mutate, isPending, isError, error } = useAddEvent()

  useEffect(() => {
    if (modal.type === "createEvent") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [modal]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const eventData = {
      title,
      category,
      startDate,
      location,
      description,
    };

    mutate(eventData, {
      onSuccess: () => {
        setTitle("");
        setCategory("");
        setStartDate("");
        setLocation("");
        setDescription("");
        closeModal();
      },
      onError: (err) => {
        console.error("Hata oluştu:", err);
      }
    });
  };

  if (modal.type == null) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
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
            <span className={`absolute -top-2 -left-4 -right-4 h-11 bg-indigo-200/60 z-0 -rotate-1 rounded-[6px_15px_4px_12px] transform-gpu`}></span>

            <span className="relative z-10 px-2 leading-none">
              Add New Event
            </span>
          </h2>

          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-3 ml-1">
            Ready to plan?
          </p>
        </div>

        {/* Etkinlik Oluşturma Formu */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Etkinlik Başlığı */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-lg text-slate-600">Event Title*</label>
            <input
              type="text"
              name="title"
              placeholder="What are we doing?"
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-handwriting transition-all"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Kategori Seçimi */}
          <div className="space-y-1 font-serif">
            <ModalCombobox value={category} onChange={setCategory} />
          </div>

          {/* Zaman Seçimi */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-lg text-slate-600">Date & Time*</label>
            <input
              name="startDate"
              type="datetime-local"
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-mono text-sm text-slate-700 transition-all"
              onChange={(e) => {
                const utc = new Date(e.target.value).toISOString()
                setStartDate(utc)
              }}
              required
            />
          </div>

          {/* Konum */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-lg text-slate-600">Location*</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Office"
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-handwriting transition-all"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          {/* Detay */}
          <div className="space-y-1 font-serif">
            <label className="block font-handwriting text-lg text-slate-600">Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Add some details..."
              className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 font-handwriting resize-none transition-all"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <button
              disabled={isPending}
              className={`bg-indigo-500/90 text-white px-6 py-2 font-handwriting md:text-xl shadow-md transition-all 
                                ${!isPending && "hover:scale-110 hover:-rotate-2 active:scale-95"} 
                                ${isPending && "opacity-70 cursor-not-allowed"}
                                ${wobblyBorder}`}>
              {isPending ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}