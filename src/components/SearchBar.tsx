import { ArrowRightToLine, Search } from "lucide-react";
import SearchOptionButton from "./SearchOptionButton";
import React, { useRef, useState } from "react";

const parseQuery = (query: string) => {
  return new URLSearchParams({ q: query.trim() }).toString();
};

const SearchBar = () => {
  const [active, setActive] = useState<string>("google");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const options = [
    { icon: "/icons/google.svg", text: "Google", value: "google" },
    { icon: "/icons/bing.svg", text: "Bing", value: "bing" },
    { icon: "/icons/ddg.svg", text: "DuckDuckGo", value: "duckduckgo" },
  ];

  const handleSearch = () => {
    const rawSearchQuery = inputRef.current?.value || "";
    const searchQuery = parseQuery(rawSearchQuery);
    const url = `https://www.${active}.com/search?${searchQuery}`;

    window.location.href = url;
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full px-2 flex flex-col items-center gap-2">
      <div className="w-full max-w-xl flex items-center justify-between gap-2 rounded-md ring-1 ring-text px-2 py-1 shadow-lg mt-6 flex-wrap md:flex-nowrap">
        <div className="w-full flex items-center gap-2">
          <Search className="w-6 h-6 text-text" />
          <input
            ref={inputRef}
            id="search"
            type="text"
            placeholder="Search..."
            className="text-lg outline-none"
            onKeyDown={handleEnter}
          />
        </div>
        <button
          onClick={handleSearch}
          className="border-2 bg-background-light/90 backdrop-blur-lg border-border rounded-xl cursor-pointer p-2 hidden md:block"
        >
          <ArrowRightToLine className="w-6 h-6 text-text self-end" />
        </button>
      </div>
      <div className="w-full max-w-xl h-max p-2 flex items-center justify-between flex-wrap gap-2">
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => setActive(opt.value)}
            className="flex-1"
          >
            <SearchOptionButton
              icon={opt.icon}
              text={opt.text}
              isActive={active === opt.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
