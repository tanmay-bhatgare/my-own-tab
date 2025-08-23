import { ArrowRightToLine, Search } from "lucide-react";
import SearchOptionButton from "./SearchOptionButton";
import { useRef, useState } from "react";

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

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center justify-between gap-2 rounded-md ring-1 ring-text px-2 py-1 shadow-lg w-xl mt-6">
        <div className="flex items-center gap-2">
          <Search className="w-6 h-6 text-text" />
          <input
            ref={inputRef}
            id="search"
            type="text"
            placeholder="Search..."
            className="text-lg outline-none"
          />
        </div>
        <button
          onClick={handleSearch}
          className="border-2 bg-background-light/90 backdrop-blur-lg border-border rounded-xl cursor-pointer p-2"
        >
          <ArrowRightToLine className="w-6 h-6 text-text self-end" />
        </button>
      </div>
      <div className="w-full h-max p-2 flex items-center justify-between gap-2">
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
