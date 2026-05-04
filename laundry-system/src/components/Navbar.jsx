import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#1e293b",
        color: "white",
      }}
    >
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Laundry System
      </h2>

      <div>
        <button
          onClick={() => navigate("/student")}
          style={{ marginRight: "10px" }}
        >
          Student
        </button>

        <button onClick={() => navigate("/worker-login")}>Worker</button>
      </div>
    </div>
  );
}
