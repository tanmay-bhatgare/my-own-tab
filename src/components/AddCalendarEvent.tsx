import React, { useState } from "react";
import { useSheet } from "../hooks/useSheet";
// import { useSheet } from "../hooks/useSheet";

const STORAGE_KEY = "c-events";
type EventType = {
  id: number | null;
  title: string;
  description: string;
};

const AddCalendarEvent = () => {
  const [event, setEvent] = useState<EventType>({
    id: null,
    title: "",
    description: "",
  });

  const { sheetData: data } = useSheet();

  const handleAddEvent = () => {
    const rawEvents = localStorage.getItem(STORAGE_KEY) || "[]";
    const allEvents: EventType[] = JSON.parse(rawEvents);

    const eventsToStore = JSON.stringify([...allEvents, { ...event, id: 2 }]);

    localStorage.setItem(STORAGE_KEY, eventsToStore);
  };
  return (
    <div className="w-full h-full max-h-1/2 flex flex-col py-1 px-2 gap-4 overflow-y-auto">
      <div className="w-full flex flex-col">
        <label htmlFor="ac-name">Event Title:</label>
        <input
          type="text"
          name="title"
          placeholder="e.g Meeting with client..."
          id="ac-name"
          className="outline-none border-b px-1 py-2 font-semibold focus:bg-background-light/40 rounded font-jetbrains"
          value={event.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEvent({ ...event, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="ac-description">Event Description:</label>
        <textarea
          name="description"
          id="ac-description"
          className="min-h-[200px] px-2 border-b py-2 font-semibold focus:bg-background-light/40 rounded outline-none font-jetbrains flex-1"
          placeholder="e.g Had a revision meeting with client..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setEvent({ ...event, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <button
          onClick={handleAddEvent}
          className="p-3 bg-background-light/90 rounded-lg cursor-pointer hover:bg-background-light/70 transition-all"
        >
          <span className="font-semibold text-lg">Label {data?.value}</span>
        </button>
        <button
          onClick={handleAddEvent}
          className="p-3 bg-danger rounded-lg cursor-pointer hover:bg-danger/90 transition-all"
        >
          <span className="font-semibold text-lg">Delete Label</span>
        </button>
      </div>
    </div>
  );
};

export default AddCalendarEvent;

// TODO: add event id increment logic