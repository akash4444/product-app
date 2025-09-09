"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/appStore";

export default function PremiumSearch({
  placeholder = "Search products...",
  debounceMs = 300,
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);

  const { setSearchProduct } = useAppStore();

  useEffect(() => {
    if (!value.trim()) {
      setSearchProduct("");
      setSuggestions([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            value
          )}&limit=30`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.products || []);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    }, debounceMs);

    return () => clearTimeout(debounceRef.current);
  }, [value, debounceMs, setSearchProduct]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClear() {
    setValue("");
    setSuggestions([]);
    setSearchProduct("");
    setShowDropdown(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowDropdown(false);
    setSearchProduct(value);
    router.push(`/?page=${1}`);
  }

  function handleSelect(item) {
    setValue(item.title);
    setSearchProduct(item.title);
    setShowDropdown(false);
    router.push(`/?page=${1}`);
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4" ref={dropdownRef}>
      {/* Search Container */}
      <div className="flex items-center gap-2">
        {/* Input container */}
        <div className="relative flex-grow">
          <div className="relative flex items-center bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-md focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300">
            {/* Left icon */}
            <div className="absolute left-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            {/* Input */}
            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setShowDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // prevent default behavior like form submission
                  handleSubmit(e);
                }
              }}
              placeholder={placeholder}
              className="pl-12 pr-12 py-3 w-full text-sm sm:text-base text-gray-700 bg-transparent border-none focus:outline-none placeholder-gray-400"
            />

            {/* Clear button */}
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 h-7 w-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex items-center px-5 py-3 bg-yellow-500 text-black font-medium rounded-full shadow-md hover:bg-yellow-400 active:scale-95 transition-all duration-200"
        >
          <Search className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {/* Suggestions dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-xl mt-2 shadow-xl z-10 max-h-80 overflow-auto transition-all duration-300">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-yellow-50 cursor-pointer text-gray-700 transition-colors duration-200"
            >
              {item.title || item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
