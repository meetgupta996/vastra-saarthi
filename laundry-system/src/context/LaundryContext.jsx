import { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../hooks/useLocalStorage";

const LaundryContext = createContext();

export const LaundryProvider = ({ children }) => {
  const [entries, setEntries] = useState(() =>
    getLocalStorage("laundry_entries", []),
  );

  const [pin, setPin] = useState(() =>
    getLocalStorage("laundry_worker_pin", "1234"),
  );

  useEffect(() => {
    setLocalStorage("laundry_entries", entries);
  }, [entries]);

  useEffect(() => {
    setLocalStorage("laundry_worker_pin", pin);
  }, [pin]);

  // add new laundry entry
  const addEntry = (studentId, clothCount, notes = "") => {
    // normalize input
    studentId = studentId.trim().toUpperCase();

    // validation
    if (!studentId || !clothCount || clothCount <= 0) {
      return { success: false, message: "Invalid input" };
    }

    // duplicate active laundry check
    const exists = entries.some(
      (e) =>
        e.studentId === studentId &&
        (e.status === "submitted" || e.status === "ready"),
    );

    if (exists) {
      return {
        success: false,
        message: "Active laundry already exists",
      };
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

    // safe state update
    setEntries((prev) => [...prev, newEntry]);

    return { success: true };
  };

  // update status to ready
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

  // update status to collected
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

  // dashboard statistics
  const stats = {
    totalActive: entries.filter(
      (e) => e.status === "submitted" || e.status === "ready",
    ).length,

    readyCount: entries.filter((e) => e.status === "ready").length,

    collectedCount: entries.filter((e) => e.status === "collected").length,

    totalEntries: entries.length,
  };

  // change worker PIN
  const changePin = (oldPin, newPin) => {
    // FIXED PIN COMPARISON
    if (oldPin.toString() !== pin.toString()) {
      return {
        success: false,
        message: "Incorrect old PIN",
      };
    }

    if (newPin.length < 4) {
      return {
        success: false,
        message: "PIN must be at least 4 digits",
      };
    }

    setPin(newPin);

    return {
      success: true,
      message: "PIN updated successfully",
    };
  };

  // clear all entries
  const clearEntries = () => {
    setEntries([]);
  };

  // newest first
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
        stats,
        changePin,
        clearEntries,
      }}
    >
      {children}
    </LaundryContext.Provider>
  );
};

export const useLaundry = () => useContext(LaundryContext);
