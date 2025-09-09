"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/appStore";
import { CartItem } from "@/types/productTypes";

const ProductSearch = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<CartItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { setSearchProduct } = useAppStore();

  const debounceDelay = 500;

  useEffect(() => {
    if (!value.trim()) {
      setSearchProduct("");
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchSuggestions = async () => {
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${value}&limit=30`
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
      };

      fetchSuggestions();
    }, debounceDelay);

    // Cleanup timeout on value change
    return () => clearTimeout(handler);
  }, [value, setSearchProduct]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
    setSearchProduct("");
    setShowDropdown(false);
  };

  const handleSubmit = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setShowDropdown(false);
    setSearchProduct(value);
    router.push(`/?page=${1}`);
  };

  const handleSelect = (item: CartItem) => {
    setValue(item.title);
    setSearchProduct(item.title);
    setShowDropdown(false);
    router.push(`/?page=${1}`);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto px-1" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <div className="relative flex items-center bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-md focus-within:ring-2 focus-within:ring-yellow-400 transition-all duration-300">
            <div className="absolute left-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>

            <input
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setShowDropdown(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Search products..."
              className="pl-12 pr-12 py-3 w-full text-sm sm:text-base text-gray-700 bg-transparent border-none focus:outline-none placeholder-gray-400"
            />

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

        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="flex items-center px-2 py-3 bg-yellow-500 text-black font-medium rounded-full shadow-md hover:bg-yellow-400 active:scale-95 transition-all duration-200"
        >
          <Search className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-xl mt-2 shadow-xl z-10 max-h-80 overflow-auto transition-all duration-300">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-yellow-50 cursor-pointer text-gray-700 transition-colors duration-200"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
