import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        {/* HEADING */}
        <h1
          style={{
            fontSize: "3.5rem",
            marginBottom: "10px",
          }}
        >
          Vastra Saarthi
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "1.1rem",
            marginBottom: "40px",
            maxWidth: "600px",
          }}
        >
          Smart Campus Laundry Management System
        </p>

        {/* PORTAL CARDS */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* STUDENT CARD */}
          <div
            onClick={() => navigate("/student")}
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "18px",
              cursor: "pointer",
              textAlign: "center",
              width: "260px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              transition: "0.2s ease",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                color: "#5b21b6",
              }}
            >
              Student Portal
            </h2>

            <p style={{ color: "#666" }}>Track laundry status and updates</p>
          </div>

          {/* WORKER CARD */}
          <div
            onClick={() => navigate("/worker-login")}
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "18px",
              cursor: "pointer",
              textAlign: "center",
              width: "260px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              transition: "0.2s ease",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                color: "#5b21b6",
              }}
            >
              Worker Portal
            </h2>

            <p style={{ color: "#666" }}>
              Manage laundry operations efficiently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
