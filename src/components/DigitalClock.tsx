import React, { useEffect, useState } from "react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatted);
    };

    const updateDate = () => {
      const today = new Date();
      const formatted = today.toLocaleDateString("en-US", {
        weekday: "long", // "Tuesday"
        year: "numeric", // "2025"
        month: "long", // "August"
        day: "numeric", // "19"
      });
      setDate(formatted);
    };

    // run once on mount
    updateClock();
    updateDate();

    // update time every second
    const timeInterval = setInterval(updateClock, 1000);

    // update date every 1 hour (optional: could also calculate until midnight)
    const dateInterval = setInterval(updateDate, 60 * 60 * 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(dateInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full rounded-2xl">
      <div className="px-8 py-6 rounded-2xl bg-none flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold select-none text-text tracking-wide">
          {time}
        </h1>
        <h1 className="text-text-muted text-base md:text-lg lg:text-xl xl:text-2xl font-medium select-none tracking-wide">
          {date}
        </h1>
      </div>
    </div>
  );
};

export default DigitalClock;
