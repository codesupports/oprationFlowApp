
"use client";

import { Search, X } from "lucide-react";

export default function RequestSearch({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="w-full">
      <label htmlFor="request-search" className="mb-2 block text-sm font-medium text-slate-700">Search Requests</label>
      <div className="relative">
        {/* Search Icon */}
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        {/* Input */}
        <input
          id="request-search"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search by request ID, title or assigned user..."
          className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

