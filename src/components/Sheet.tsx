import React, {
  type ComponentType,
  type SVGProps,
  type ReactElement,
  type CSSProperties,
} from "react";
import { useSheet } from "../hooks/useSheet";
import { X } from "lucide-react";

interface SheetProps {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content: ReactElement;
  className?: string;
  width?: number | string; // px, %, rem, etc.
  hide?: boolean;
}

const Sheet: React.FC<SheetProps> = ({
  id,
  icon: Icon,
  title,
  content,
  className = "",
  width,
  hide = false,
}) => {
  const { openSheet, closeSheet, isOpen } = useSheet();
  const sheetOpen = isOpen(id);

  const sheetStyle: CSSProperties = width ? { width } : {};

  return (
    <div className={className}>
      {/* Trigger button (can be hidden if external control is used) */}
      <div
        onClick={() => openSheet(id)}
        className={`flex flex-col items-center justify-center gap-1 cursor-pointer ${
          hide ? "hidden" : ""
        }`}
      >
        <div className="w-16 h-16 p-1 rounded-full flex items-center justify-center bg-background-light">
          <Icon className="w-[50%] h-[50%]" />
        </div>
        <span className="text-sm font-semibold">{title}</span>
      </div>

      {/* Backdrop */}
      {sheetOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={closeSheet} />
      )}

      {/* Sheet Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-background shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          sheetOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={sheetStyle}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border-muted">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={closeSheet} className="text-xl cursor-pointer">
            <X />
          </button>
        </div>

        {/* Content */}
        {sheetOpen && <div className="w-full h-full p-2">{content}</div>}
      </div>
    </div>
  );
};

export default Sheet;
