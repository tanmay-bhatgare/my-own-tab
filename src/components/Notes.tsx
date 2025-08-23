import React, { useState, useEffect, type ChangeEvent } from "react";

const Notes: React.FC = () => {
  const STORAGE_KEY = "my-note";

  const [text, setText] = useState<string>("");

  // Load saved note from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setText(saved);
  }, []);

  // Save to localStorage whenever text changes
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = e.target.value;
    setText(newValue);
    localStorage.setItem(STORAGE_KEY, newValue);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      className="w-xl max-h-48 min-h-48 border border-border-muted bg-[rgba(6,11,22,0.1)] backdrop-blur-3xl text-lg p-2 rounded-md font-jetbrains text-text placeholder-text-muted outline-none"
      placeholder="Any Agenda For Today?"
    />
  );
};

export default Notes;
