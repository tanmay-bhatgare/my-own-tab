import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="w-full sm:w-1/2 mx-auto bg-background-light/10 border border-border rounded-xl p-2 backdrop-blur-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 rounded bg-background-light cursor-pointer"
        >
          <ChevronLeft />
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 rounded bg-background-light cursor-pointer"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center text-text-muted">
        {/* Weekdays */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-medium text-sm">
            {d}
          </div>
        ))}

        {/* Empty slots before month starts */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
        {days.map((day) => (
          <div
            key={day}
            className={`relative p-2 rounded-lg border cursor-pointer transition 
              ${
                hoveredDay === day
                  ? "bg-background-light border-border"
                  : "hover:bg-border-muted"
              }
            `}
            // onClick={(first) => { second }}
            onMouseEnter={() => setHoveredDay(day)}
            onMouseLeave={() => setHoveredDay(null)}
          >
            {day}

            {hoveredDay === day && (
              <div className="w-[100px] absolute -top-15 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-md">
                A Meeting with US Client
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
