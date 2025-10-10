import { Pencil, Plus, Trash2 } from "lucide-react";
import type { ShortcutType } from "./Shortcuts";
import type React from "react";
import { useState } from "react";

function getDomain(url: string) {
  try {
    let hostname = new URL(url).hostname;
    if (hostname.startsWith("www.")) {
      hostname = hostname.slice(4);
    }
    return hostname;
  } catch {
    console.error("Invalid URL:", url);
    return null;
  }
}

const EditShortcut = ({
  shortcuts,
  setShortcuts,
}: {
  shortcuts: ShortcutType[];
  setShortcuts: React.Dispatch<React.SetStateAction<ShortcutType[]>>;
}) => {
  const [shortcut, setShortcut] = useState<ShortcutType>({ name: "", url: "" });
  const [mode, setMode] = useState<"Add" | "Edit">("Add");

  const handleShortcutChange = (type: string, value: string) => {
    setShortcut((p) => ({ ...p, [type]: value }));
  };

  const handleDeleteShortcut = (_shortcut: ShortcutType) => {
    setShortcuts((prev) => prev.filter((item) => item.url !== _shortcut.url));
  };

  const handleAddShortcut = (_shortcut: ShortcutType) => {
    console.log(shortcuts.length);
    if (shortcuts.length > 4) {
      alert("Can't add more than 5 shortcuts.");
      return;
    }
    try {
      const exists = shortcuts.some((item) => item.url === shortcut.url);

      if (mode === "Add" && exists) {
        alert("Shortcut already exists, try editing it.");
        return;
      } else if (mode === "Edit") {
        const updatedShortcuts = shortcuts.map((item) =>
          item.url === _shortcut.url ? shortcut : item
        );
        setShortcuts(updatedShortcuts);
      } else {
        new URL(shortcut.url); // validate
        setShortcuts((prev) => [...prev, shortcut]);
      }

      setShortcut({ name: "", url: "" });
      setMode("Add"); // reset after edit
    } catch {
      alert("Invalid URL, must contain 'https://' at start.");
    }
  };

  const handleEditShortcut = (_shortcut: ShortcutType) => {
    setMode("Edit");
    setShortcut(_shortcut);
  };

  return (
    <div className="">
      <div className="w-full bg-background-light rounded-md p-2 flex flex-col gap-4">
        <div className="w-full flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={shortcut?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleShortcutChange(e.target.name, e.target.value);
            }}
            placeholder="eg. StackOverflow"
            className="outline-none border-b px-1 py-2 font-semibold"
          />
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            name="url"
            id="url"
            value={shortcut?.url}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleShortcutChange(e.target.name, e.target.value);
            }}
            placeholder="eg. https://stackoverflow.com"
            className="outline-none border-b px-1 py-2 font-semibold"
          />
        </div>

        <button
          onClick={() => handleAddShortcut(shortcut)}
          className="flex items-center justify-center border-2 border-border hover:border-border-muted bg-background py-2 rounded-md gap-2 cursor-pointer transition-all duration-200"
        >
          {mode === "Add" ? (
            <Plus className="w-6 h-6" />
          ) : (
            <Pencil className="w-6 h-6" />
          )}
          {mode}
        </button>
      </div>
      <hr className="text-border my-2" />
      <div className="w-full h-max flex flex-col gap-1 py-2 px-1">
        {shortcuts.map((item) => (
          <div
            key={item.url}
            className="py-2 px-1 bg-background-light rounded-md flex items-center justify-between"
          >
            <div className="flex items-center gap-4 px-2">
              <img
                src={`https://icons.duckduckgo.com/ip2/${getDomain(
                  item.url
                )}.ico`}
                alt={item.name}
                className="w-12 h-full rounded-full bg-white"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/64")
                }
              />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="cursor-pointer"
                onClick={() => handleEditShortcut(item)}
              >
                <Pencil className="w-6 h-6" />
              </button>
              <div className="w-0.5 h-8 border" />
              <button
                className="cursor-pointer"
                onClick={() => handleDeleteShortcut(item)}
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditShortcut;
