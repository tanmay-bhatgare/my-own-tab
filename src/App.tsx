import DigitalClock from "./components/DigitalClock";
import DotGrid from "./components/DotGrid/DotGrid";
import Notes from "./components/Notes";
import RandomQuote from "./components/RandomQuote";
import SearchBar from "./components/SearchBar";
import { Shortcuts } from "./components/Shortcuts";
import Todo from "./components/Todo";

const App = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
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
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full px-4">
          <div className="mx-auto w-full p-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Left column */}
            <div className="w-full sm:w-1/2 flex flex-col items-center">
              <DigitalClock />
              <SearchBar />
              <Notes />
              <div className="max-w-2xl text-center mt-8">
                <RandomQuote />
              </div>
            </div>

            {/* Right column */}
            <div className="w-full sm:w-1/2 flex flex-col items-center">
              <div className="w-full flex flex-col sm:flex-row gap-4 p-2">
                <Todo />
                <Todo />
              </div>
            </div>
          </div>
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
