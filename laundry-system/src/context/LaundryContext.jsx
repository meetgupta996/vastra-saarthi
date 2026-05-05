import { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../hooks/useLocalStorage";

const LaundryContext = createContext();

export const LaundryProvider = ({ children }) => {
  const [entries, setEntries] = useState(() =>
    getLocalStorage("laundry_entries", [])
  );

  const [pin, setPin] = useState(() =>
    getLocalStorage("laundry_worker_pin", "1234")
  );

  useEffect(() => {
    setLocalStorage("laundry_entries", entries);
  }, [entries]);

  useEffect(() => {
    setLocalStorage("laundry_worker_pin", pin);
  }, [pin]);

  // add entry
  const addEntry = (studentId, clothCount, notes = "") => {
    // normalize input
    studentId = studentId.trim().toUpperCase();

    // validation
    if (!studentId || !clothCount || clothCount <= 0) {
      return { success: false, message: "Invalid input" };
    }

    // duplicate check
    const exists = entries.some(
      (e) =>
        e.studentId === studentId &&
        (e.status === "submitted" || e.status === "ready")
    );

    if (exists) {
      return { success: false, message: "Active laundry already exists" };
    }

    const newEntry = {
      id: Date.now(),
      studentId,
      clothCount,
      notes,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      readyAt: null,
      collectedAt: null,
    };

    // state update
    setEntries((prev) => [...prev, newEntry]);

    return { success: true };
  };

  // mark ready
  const markReady = (id) => {
    const updated = entries.map((e) => {
      if (e.id === id && e.status === "submitted") {
        return {
          ...e,
          status: "ready",
          readyAt: new Date().toISOString(),
        };
      }
      return e;
    });

    setEntries(updated);
  };

  // mark collected
  const markCollected = (id) => {
    const updated = entries.map((e) => {
      if (e.id === id && e.status === "ready") {
        return {
          ...e,
          status: "collected",
          collectedAt: new Date().toISOString(),
        };
      }
      return e;
    });

    setEntries(updated);
  };

  // sorting
  const sortedEntries = [...entries].sort((a, b) => b.id - a.id);

  return (
    <LaundryContext.Provider
      value={{
        entries: sortedEntries,
        setEntries,
        pin,
        setPin,
        addEntry,
        markReady,
        markCollected,
      }}
    >
      {children}
    </LaundryContext.Provider>
  );
};

export const useLaundry = () => useContext(LaundryContext);