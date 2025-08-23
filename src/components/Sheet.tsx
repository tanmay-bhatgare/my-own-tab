import { Pencil } from "lucide-react";
import { useState } from "react";

export default function Sheet({ content }: { content: React.ReactElement }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {/* Toggle Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
      >
        <div className="w-16 h-16 p-1 rounded-full flex items-center justify-center bg-background-light">
          <Pencil className="w-[50%] h-[50%]" />
        </div>
        <span className="text-sm font-semibold">Edit</span>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Side Sheet */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-background shadow-lg z-50 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border-muted">
          <h2 className="text-xl font-semibold">Edit Shortcuts</h2>
          <button onClick={() => setIsOpen(false)} className="text-xl cursor-pointer">
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="p-2">{content}</div>
      </div>
    </div>
  );
}
