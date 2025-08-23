import DigitalClock from "./components/DigitalClock";
import DotGrid from "./components/DotGrid/DotGrid";
import Notes from "./components/Notes";
import RandomQuote from "./components/RandomQuote";
import SearchBar from "./components/SearchBar";
import { Shortcuts } from "./components/Shortcuts";

const App = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col overflow-hidden font-poppins">
      {/* DotGrid background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271e37"
          activeColor="#5227FF"
          proximity={150}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="w-full h-full"
        />
      </div>

      {/* Foreground content */}
      <div className="flex flex-col items-center gap-4 flex-1 justify-center">
        <DigitalClock />
        <SearchBar />
        <Notes />
        <div className="max-w-2xl text-center mt-8">
          <RandomQuote />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center mb-4">
        <Shortcuts />
      </footer>
    </div>
  );
};

export default App;
