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

  // adds entry
  const addEntry = (studentId, clothCount, notes = "") => {
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

    setEntries([...entries, newEntry]);

    return { success: true };
  };

  //  marks ready
  const markReady = (id) => {
    const updated = entries.map((e) =>
      e.id === id
        ? { ...e, status: "ready", readyAt: new Date().toISOString() }
        : e
    );

    setEntries(updated);
  };

  // marks collected
  const markCollected = (id) => {
    const updated = entries.map((e) =>
      e.id === id
        ? { ...e, status: "collected", collectedAt: new Date().toISOString() }
        : e
    );

    setEntries(updated);
  };

  return (
    <LaundryContext.Provider
      value={{
        entries,
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