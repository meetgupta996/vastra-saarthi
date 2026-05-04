import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          gap: "40px",
        }}
      >
        {/* Student Card */}
        <div
          onClick={() => navigate("/student")}
          style={{
            padding: "40px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
            textAlign: "center",
            width: "200px",
          }}
        >
          <h2>Student Portal</h2>
        </div>

        {/* Worker Card */}
        <div
          onClick={() => navigate("/worker-login")}
          style={{
            padding: "40px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
            textAlign: "center",
            width: "200px",
          }}
        >
          <h2>Worker Portal</h2>
        </div>
      </div>
    </div>
  );
}
