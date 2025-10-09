import { Cross } from "lucide-react";
import {
  useState,
  type ComponentType,
  type SVGProps,
  type ReactElement,
  type CSSProperties,
} from "react";

export default function Sheet({
  icon: Icon,
  title,
  content,
  className = "",
  width, // optional width prop
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  content: ReactElement;
  className?: string;
  width?: number | string; // can be px, %, rem, or Tailwind class
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Use inline style if width is a number (px) or string (like '50%')
  const sheetStyle: CSSProperties = width ? { width } : {};

  return (
    <div className={className}>
      {/* Toggle Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center justify-center gap-1 cursor-pointer"
      >
        <div className="w-16 h-16 p-1 rounded-full flex items-center justify-center bg-background-light">
          <Icon className="w-[50%] h-[50%]" />
        </div>
        <span className="text-sm font-semibold">{title}</span>
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
        className={`fixed top-0 right-0 h-full bg-background shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${width}
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={sheetStyle} // ✅ apply dynamic width
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border-muted">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-xl cursor-pointer"
          >
            <Cross />
          </button>
        </div>

        {/* Body */}
        {isOpen && <div className="w-full h-full p-2">{content}</div>}
      </div>
    </div>
  );
}
