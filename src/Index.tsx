import { Newspaper } from "lucide-react";
import DigitalClock from "./components/DigitalClock";
import DotGrid from "./components/DotGrid/DotGrid";
import Notes from "./components/Notes";
import RandomQuote from "./components/RandomQuote";
import SearchBar from "./components/SearchBar";
import Sheet from "./components/Sheet";
import { Shortcuts } from "./components/Shortcuts";
import NewsList from "./components/NewsList";
import Todo from "./components/Todo";
import Calendar from "./components/Calendar";
import AddCalendarEvent from "./components/AddCalendarEvent";

const Index = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
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
          <div className="mx-auto w-full p-4 flex flex-col xl:flex-row justify-center items-center gap-4">
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
            <div className="w-full xl:w-1/2 flex flex-col items-center">
              <div className="w-full flex flex-col justify-center sm:flex-row gap-4 p-2">
                <Todo />
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-row items-center justify-center mb-4">
        <div className="flex-1 flex items-center justify-center">
          <Shortcuts />
        </div>
        <div className="flex items-center justify-center">
          {/* News Section */}
          <Sheet
            id="news"
            icon={Newspaper}
            title="What's New!"
            content={<NewsList />}
            width={"50%"}
          />
          <Sheet
            hide
            id="calendar"
            icon={Newspaper}
            title="Add the event"
            content={<AddCalendarEvent />}
            width={"350px"}
          />
        </div>
      </footer>
    </div>
  );
};

export default Index;
