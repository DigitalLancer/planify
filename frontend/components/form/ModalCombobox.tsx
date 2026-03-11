"use client";

import { Category, categories } from "@/types/event";

type CategorySelectProps = {
  value: Category | "";
  onChange: (value: Category) => void;
};

export default function ModalCombobox({
  value,
  onChange,
}: CategorySelectProps) {
  return (
    <div>
      <label htmlFor="category" className="block font-handwriting text-xl text-slate-600">Category</label>
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value as Category)}
        className="w-full bg-white border-2 border-slate-900/30 rounded-xl px-4 py-2 outline-none focus:border-indigo-400 text-slate-700 font-handwriting text-xl transition-all"
      >
        <option value="" className="text-slate-400">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}