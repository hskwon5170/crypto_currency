import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useAtom } from "jotai";
import { updateDarkAtom } from "../commons/JotaiStore/JotaiStore";

interface CoinSearchProps {
  onSearchChange: (value: string) => void;
}

export const CoinSearch: FC<CoinSearchProps> = ({ onSearchChange }) => {
  const [dark] = useAtom(updateDarkAtom);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 250);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    onSearchChange(debounceSearch);
  }, [debounceSearch, onSearchChange]);

  return (
    <div className="py-6">
      <label
        htmlFor="default-search"
        className={`mb-2 text-sm font-medium sr-only  ${
          dark ? "text-gray-300" : "text-gray-900"
        }`}
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className={`w-5 h-5   ${dark ? "text-gray-400" : "text-gray-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className={`block p-4 pl-10 w-full text-[1rem]  rounded-lg border outline-none transition-all duration-300 focus:border-[#4ffae5] focus:ring-[#4ffae5] ${
            dark
              ? " text-white placeholder-gray-400  bg-black border-gray-600"
              : "border-gray-300  text-gray-900 bg-gray-50 "
          }`}
          placeholder="Search Tokens"
          onChange={handleInputChange}
          value={search}
          required
        />
      </div>
    </div>
  );
};
