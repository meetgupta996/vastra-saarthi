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

  return (
    <LaundryContext.Provider value={{ entries, setEntries, pin, setPin }}>
      {children}
    </LaundryContext.Provider>
  );
};

export const useLaundry = () => useContext(LaundryContext);