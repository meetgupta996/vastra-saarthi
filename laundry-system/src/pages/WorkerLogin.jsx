import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLaundry } from "../context/LaundryContext";

export default function WorkerLogin() {
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { pin } = useLaundry(); // 🔥 MUST use context

  const handleLogin = () => {
    if (pinInput === pin) {
      sessionStorage.setItem("auth", "true"); // 🔥 REQUIRED
      navigate("/worker");
    } else {
      setError("Wrong PIN");
    }
  };

  return (
    <div>
      <h2>Worker Login</h2>

      <input
        type="password"
        placeholder="Enter PIN"
        value={pinInput}
        onChange={(e) => setPinInput(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {error && <p>{error}</p>}
    </div>
  );
}
