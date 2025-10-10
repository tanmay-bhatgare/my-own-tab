import { useContext } from "react";
import SheetContext from "../context/SheetProvider";

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) throw new Error("useSheet must be used within a SheetProvider");
  return context;
};
