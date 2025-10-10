import { createContext, useState, type ReactNode } from "react";

// ✅ Define the SheetData type
type SheetData = {
  value: string | number | null;
  callback: (() => void) | null;
};

// ✅ Define context shape
interface SheetContextType {
  openSheetId: string | null;
  openSheet: (id: string) => void;
  closeSheet: () => void;
  isOpen: (id: string) => boolean;
  sheetData: SheetData | null;
  openSheetWithData: (id: string, data: SheetData) => void;
}

// ✅ Create context
const SheetContext = createContext<SheetContextType | undefined>(undefined);

// ✅ Provider
export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const [openSheetId, setOpenSheetId] = useState<string | null>(null);
  const [sheetData, setSheetData] = useState<SheetData | null>(null);

  const openSheet = (id: string) => setOpenSheetId(id);
  const closeSheet = () => setOpenSheetId(null);
  const isOpen = (id: string) => openSheetId === id;

  const openSheetWithData = (id: string, data: SheetData) => {
    setOpenSheetId(id);
    setSheetData(data);
  };

  const value: SheetContextType = {
    openSheetId,
    openSheet,
    closeSheet,
    isOpen,
    sheetData,
    openSheetWithData,
  };

  return (
    <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
  );
};

export default SheetContext;
