import React from "react";
import { SheetProvider } from "./context/SheetProvider";
import Index from "./Index";

const App: React.FC = () => (
  <SheetProvider>
    <Index />
  </SheetProvider>
);

export default App;
