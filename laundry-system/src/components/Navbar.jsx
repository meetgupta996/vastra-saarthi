import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 35px",
        background: "linear-gradient(135deg, #7c3aed, #6366f1)",
        color: "white",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        flexWrap: "wrap",
      }}
    >
      {/* LOGO / TITLE */}
      <h2
        style={{
          cursor: "pointer",
          fontSize: "1.6rem",
          fontWeight: "700",
        }}
        onClick={() => navigate("/")}
      >
        Vastra Saarthi
      </h2>

      {/* NAV BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/student")}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          Student Portal
        </button>

        <button
          onClick={() => navigate("/worker-login")}
          style={{
            background: "white",
            color: "#5b21b6",
            fontWeight: "700",
          }}
        >
          Worker Portal
        </button>
      </div>
    </div>
  );
}
