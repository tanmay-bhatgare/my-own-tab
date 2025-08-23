import { useEffect, useState } from "react";
import Sheet from "./Sheet";
import EditShortcut from "./EditShortcut";

export type ShortcutType = {
  name: string;
  url: string;
};

function getDomain(url: string) {
  try {
    let hostname = new URL(url).hostname;
    if (hostname.startsWith("www.")) {
      hostname = hostname.slice(4);
    }
    return hostname;
  } catch (e) {
    console.error("Invalid URL:", url);
    return null;
  }
}

export const Shortcuts = () => {
  const [shortcuts, setShortcuts] = useState<ShortcutType[]>([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("shortcuts");
    if (saved) {
      setShortcuts(JSON.parse(saved));
    } else {
      // default shortcuts if none saved
      setShortcuts([
        { name: "ChatGPT", url: "https://www.chatgpt.com" },
        { name: "Gemini", url: "https://gemini.google.com/app" },
        { name: "Gmail", url: "https://mail.google.com/" },
      ]);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  return (
    <div className="flex items-center gap-8 p-2 flex-wrap">
      {shortcuts.map((shortcut) => (
        <div
          onClick={() => {
            window.location.href = shortcut.url;
          }}
          key={shortcut.url}
          className="flex flex-col items-center justify-center gap-1 cursor-pointer"
        >
          <div className="w-16 h-16 p-1 rounded-full flex items-center justify-center bg-background-light">
            <img
              src={`https://icons.duckduckgo.com/ip2/${getDomain(
                shortcut.url
              )}.ico`}
              alt={shortcut.name}
              className="w-full h-full rounded-full bg-white"
              onError={(e) =>
                ((e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/64")
              }
            />
          </div>
          <span className="text-sm font-semibold truncate w-20 text-center">{shortcut.name}</span>
        </div>
      ))}

      {/* Add button */}
      <Sheet
        content={
          <EditShortcut shortcuts={shortcuts} setShortcuts={setShortcuts} />
        }
      />
    </div>
  );
};
