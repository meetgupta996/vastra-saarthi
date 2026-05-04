import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLaundry } from "../context/LaundryContext";

export default function WorkerLogin() {
  const [pinInput, setPinInput] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { pin } = useLaundry();

  const handleLogin = () => {
    if (pinInput.toString() === pin.toString()) {
      sessionStorage.setItem("auth", "true");
      navigate("/worker");
    } else {
      setError("Wrong PIN");
    }
    console.log("Entered:", pinInput);
    console.log("Actual PIN:", pin);
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
