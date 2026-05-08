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
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
          }}
        >
          Worker Login
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Enter your worker PIN to access dashboard
        </p>

        <input
          type="password"
          placeholder="Enter PIN"
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
          }}
        >
          Login
        </button>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "15px",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
